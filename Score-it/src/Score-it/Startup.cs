using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Data.Entity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Score_it.Models;
using Score_it.Tools;
using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using Score_it.Models.Entities;

namespace Score_it
{
    public class Startup
    {

        public void ConfigureServices(IServiceCollection services)
        {
            var connection = @"Server=(localdb)\mssqllocaldb;Database=ScoreItDb;Trusted_Connection=True;";

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<ScoreItContext>(options => options.UseSqlServer(connection));

            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonLetterOrDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 3;
                options.User.RequireUniqueEmail = true;

                options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") &&
                            ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        return Task.FromResult(0);
                    }
                };
            })
            .AddEntityFrameworkStores<ScoreItContext>()
            .AddDefaultTokenProviders();

            services.AddTransient<RankingsDataSeedData>();

            services.AddMvc().AddJsonOptions(
                o => o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, RankingsDataSeedData seeder)
        {
            loggerFactory.AddProvider(new SqlLoggerProvider());
            app.UseIdentity();

            seeder.EnsureSeedData();

            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();

            app.UseDefaultFiles();
            app.UseIISPlatformHandler();

            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();

            
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
