using System.Collections.Generic;
using System.ComponentModel;

namespace Score_it.Models.Entities
{
    public class Player
    {
        public Player()
        {

        }

        public Player(string name)
        {
            Rank = "Rookie";
            Progress = "0";
            Name = name;
        }

        public int PlayerId { get; set; }
        [DefaultValue(0)]
        public int Level { get; set; }
        public string Name { get; set; }
        public string Progress { get; set; }
        public string Rank { get; set; }
        [DefaultValue(0)]
        public int Points { get; set; }
        [DefaultValue(0)]
        public int Wins { get; set; }
        [DefaultValue(0)]
        public int Losses { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }
        public List<PlayerGames> PlayerGames { get; set; }
    }
}
