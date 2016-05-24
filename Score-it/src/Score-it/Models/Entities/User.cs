using Microsoft.AspNet.Identity.EntityFramework;

namespace Score_it.Models.Entities
{
    public class User : IdentityUser
    {
        public Player Player { get; set; }
    }
}
