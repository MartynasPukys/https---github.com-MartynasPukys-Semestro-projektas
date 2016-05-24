using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Score_it.Models.Dto
{
    public class ProfileSummary
    {
        public string progress { get; set; }
        public int level { get; set; }
        public string badge { get; set; }
        public string name { get; set; }
        public string rank { get; set; }
        public int pointsToNextLevel { get; set; }
        public int points { get; set; }
        public int wins { get; set; }
        public int loses { get; set; }
        public List<GameSummary> recentGamesData { get; set; }
    }
}
