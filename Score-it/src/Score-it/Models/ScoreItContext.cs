using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Score_it.Models.Entities;

namespace Score_it.Models
{
    public class ScoreItContext : IdentityDbContext<User>
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<PlayerGames> PlayerGames { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<RankingData> RankingsData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(x => x.Player)
                .WithOne(x => x.User)
                .HasForeignKey<Player>(x => x.UserId);
        }
    }
}
