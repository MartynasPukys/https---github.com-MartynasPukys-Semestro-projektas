using System.Collections.Generic;
using System.Linq;

namespace Score_it.Models.Entities
{
    public class RankingsDataSeedData
    {
        private readonly ScoreItContext _context;

        public RankingsDataSeedData(ScoreItContext context )
        {
            _context = context;
        }

        public void EnsureSeedData()
        {
            if (!_context.RankingsData.Any())
            {
                var ranks = new List<RankingData>()
                {
                   new RankingData() {Level = 0, Rank = "Rookie", NextLevelPoints = 0},
                   new RankingData() {Level = 1, Rank = "Trainee", NextLevelPoints = 60},
                   new RankingData() {Level = 2, Rank = "Hobbyist", NextLevelPoints = 140},
                   new RankingData() {Level = 3, Rank = "Amatuer", NextLevelPoints = 240},
                   new RankingData() {Level = 4, Rank = "Hotshot", NextLevelPoints = 360},
                   new RankingData() {Level = 5, Rank = "Captain", NextLevelPoints = 500},
                   new RankingData() {Level = 6, Rank = "Leader", NextLevelPoints = 660},
                   new RankingData() {Level = 7, Rank = "Pioneer", NextLevelPoints = 840},
                   new RankingData() {Level = 8, Rank = "Professional", NextLevelPoints = 1040},
                   new RankingData() {Level = 9, Rank = "Expert", NextLevelPoints = 1260},
                   new RankingData() {Level = 10, Rank = "Veteran", NextLevelPoints = 1500},
                   new RankingData() {Level = 11, Rank = "Elite", NextLevelPoints = 1760},
                   new RankingData() {Level = 12, Rank = "Artist", NextLevelPoints = 2040},
                   new RankingData() {Level = 13, Rank = "Super Star", NextLevelPoints = 2340},
                   new RankingData() {Level = 14, Rank = "Virtuoso", NextLevelPoints = 2660},
                   new RankingData() {Level = 15, Rank = "Genius", NextLevelPoints = 3000},
                   new RankingData() {Level = 16, Rank = "Prodigy", NextLevelPoints = 3360},
                   new RankingData() {Level = 17, Rank = "Champion", NextLevelPoints = 3740},
                   new RankingData() {Level = 18, Rank = "Guru", NextLevelPoints = 4140},
                   new RankingData() {Level = 19, Rank = "Grand Master", NextLevelPoints = 4560},
                   new RankingData() {Level = 20, Rank = "Legend", NextLevelPoints = 5000},
                   new RankingData() {Level = 21, Rank = "Superhuman", NextLevelPoints = 5460},
                   new RankingData() {Level = 22, Rank = "Immortal", NextLevelPoints = 5940},
                   new RankingData() {Level = 23, Rank = "Demi-God", NextLevelPoints = 6440}
                };

                foreach (var rank in ranks)
                {
                    _context.RankingsData.Add(rank);
                }

                _context.SaveChanges();
            }
        }
    }
}
