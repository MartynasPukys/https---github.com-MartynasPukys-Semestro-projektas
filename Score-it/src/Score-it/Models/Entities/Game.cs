using System;
using System.Collections.Generic;

namespace Score_it.Models.Entities
{
    public class Game
    {
        public Game()
        {
            GamePlayers = new List<PlayerGames>();
        }

        public int GameId { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
        public DateTime Date { get; set; }

        public List<PlayerGames> GamePlayers { get; set; }
    }
}
