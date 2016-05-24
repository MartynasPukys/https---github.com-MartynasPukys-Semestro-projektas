using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Score_it.Models.Entities
{
    public class PlayerGames
    {
        [Key]
        public int PlayerGamesId { get; set; }


        public int PlayerId { get; set; }
        public Player Player { get; set; }

        public int GameId { get; set; }
        public Game Game { get; set; }
      
        public int Team { get; set; }
        public int Position { get; set; }



    }
}
