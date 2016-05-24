using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using Score_it.Models;
using Score_it.Models.Dto;
using Score_it.Models.Entities;
using Score_it.Views.Game;

namespace Score_it.Controllers.Api
{
    public class GameController : Controller
    {
        private ScoreItContext _context;

        public GameController(ScoreItContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetGameList([FromQuery]GamePage model)
        {
            int pageSize = 2;
            int page = model.page;
            if (page == 0)
            {
                pageSize = 2;
                page = 1;
            }
            var query = _context.Games
                .OrderByDescending(x => x.Date)
                .Include(x => x.GamePlayers)
                .ThenInclude(x => x.Player)
                .ToList()
                .Take(pageSize * page);

            var games = new List<GameSummary>();

            foreach (var game in query)
            {
                var team1Score = game.Team1Score;
                var team2Score = game.Team2Score;

                string gameResult = team1Score + ":" + team2Score;

                var status = team1Score > team2Score ? "win" : "loss";
                var playerGame = game.GamePlayers;

                string[] team1 = new string[2];
                string[] team2 = new string[2];

                foreach (var players in playerGame)
                {
                    if (players.Team == 0)
                    {
                        team1[players.Position] = players.Player.Name;
                    }
                    else
                    {
                        team2[players.Position] = players.Player.Name;
                    }
                }

                var gameSummary = new GameSummary
                {
                    playerName = team1[0],
                    teammateName = team1[1],
                    opponentName = team2[0],
                    opponentTeammateName = team2[1],
                    id = game.GameId,
                    state = status,
                    result = gameResult

                };
                games.Add(gameSummary);
            }

            return Ok(games);
        }

        [HttpPost]
        public IActionResult SubmitGame([FromBody]GameResults model)
        {

            Game game = new Game()
            {
                Team1Score = model.Team1Score,
                Team2Score = model.Team2Score,
                Date = System.DateTime.Now
            };

            PlayerGames playerGame1 = new PlayerGames()
            {
                PlayerId = model.Team1Player1Id,
                Team = 0,
                Position = 0
            };

            PlayerGames playerGame2 = new PlayerGames()
            {
                PlayerId = model.Team1Player2Id,
                Team = 0,
                Position = 1
            };

            PlayerGames playerGame3 = new PlayerGames()
            {
                PlayerId = model.Team2Player1Id,
                Team = 1,
                Position = 0
            };

            PlayerGames playerGame4 = new PlayerGames()
            {
                PlayerId = model.Team2Player2Id,
                Team = 1,
                Position = 1
            };

            game.GamePlayers.Add(playerGame1);
            game.GamePlayers.Add(playerGame2);
            game.GamePlayers.Add(playerGame3);
            game.GamePlayers.Add(playerGame4);



            //Doesn't work because the order of players in the list is unpredictable
            //var players = _context.Players.Where(x =>
            //    x.PlayerId == model.Team1Player1Id ||
            //    x.PlayerId == model.Team1Player2Id ||
            //    x.PlayerId == model.Team2Player1Id ||
            //    x.PlayerId == model.Team2Player2Id
            //    ).ToList();

            var players = new List<Player>();
            players.Add(_context.Players.First(x =>
                x.PlayerId == model.Team1Player1Id));
            players.Add(_context.Players.First(x =>
                x.PlayerId == model.Team1Player2Id));
            players.Add(_context.Players.First(x =>
                x.PlayerId == model.Team2Player1Id));
            players.Add(_context.Players.First(x =>
                x.PlayerId == model.Team2Player2Id));


            if (model.Team1Score > model.Team2Score) //The first team won the game
            {
                players[0].Points = players[0].Points + 10;
                players[0].Wins = players[0].Wins + 1;

                players[1].Points = players[1].Points + 10;
                players[1].Wins = players[1].Wins + 1;

                players[2].Points = players[2].Points + 4;
                players[2].Losses = players[2].Losses + 1;

                players[3].Points = players[3].Points + 4;
                players[3].Losses = players[3].Losses + 1;
            }
            else if (model.Team1Score < model.Team2Score) //The second team won the game
            {
                players[0].Points = players[0].Points + 4;
                players[0].Losses = players[0].Losses + 1;

                players[1].Points = players[1].Points + 4;
                players[1].Losses = players[1].Losses + 1;

                players[2].Points = players[2].Points + 10;
                players[2].Wins = players[2].Wins + 1;

                players[3].Points = players[3].Points + 10;
                players[3].Wins = players[3].Wins + 1;
            }

            players[0] = CheckPlayerRank(players[0]);
            players[1] = CheckPlayerRank(players[1]);
            players[2] = CheckPlayerRank(players[2]);
            players[3] = CheckPlayerRank(players[3]);

            //_context.Entry(players[0]).State = EntityState.Modified;

            playerGame1.Player = players[0];

            _context.Games.Add(game);
            _context.SaveChanges();

            return Ok(players);
        }

        //returns a player with higher rank and level if required point limit is reached
        public Player CheckPlayerRank(Player a)
        {
            int currentLevelPoints, requiredPoints;

            currentLevelPoints = _context.RankingsData
                .First(x => x.Level == a.Level).NextLevelPoints;
            requiredPoints = _context.RankingsData
            .First(x => x.Level == a.Level+1)
            .NextLevelPoints;

            string rankName = a.Rank;
            if (a.Points >= requiredPoints)  //levelup
            {
                rankName = _context.RankingsData
                    .First(x => x.Level == a.Level + 1)
                    .Rank;

                a.Points = a.Points;
                a.Rank = rankName;
                a.Level = a.Level + 1;
            }

            int requirement, points;
            //Calculating progress
            currentLevelPoints = _context.RankingsData
                .First(x => x.Level == a.Level).NextLevelPoints;
            requiredPoints = _context.RankingsData
            .First(x => x.Level == a.Level+1)
            .NextLevelPoints;

            requirement = requiredPoints - currentLevelPoints;
            points = a.Points - currentLevelPoints;

            a.Progress = ((points * 100 / requirement)/5*5).ToString();     //rounding to 5

            return a;
        }
    }
}
