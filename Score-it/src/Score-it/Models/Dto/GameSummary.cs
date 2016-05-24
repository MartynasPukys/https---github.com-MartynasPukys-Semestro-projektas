namespace Score_it.Models.Dto
{
    public class GameSummary
    {
        public int id { get; set; }
        public string state { get; set; }
        public string playerName { get; set; }
        public string teammateName { get; set; }
        public string opponentName { get; set; }
        public string opponentTeammateName { get; set; }
        public string result { get; set; }
    }
}
