using System.ComponentModel.DataAnnotations;

namespace Score_it.Models.Entities
{
    public class RankingData
    {
        [Key]
        public int RankId { get; set; }
        public int Level { get; set; }
        public string Rank { get; set; }
        public int NextLevelPoints { get; set; }
    }
}
