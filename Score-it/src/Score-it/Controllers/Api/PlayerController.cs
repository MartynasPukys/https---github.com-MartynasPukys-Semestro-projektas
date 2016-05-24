using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using Score_it.Models;
using Score_it.Models.Dto;
using Score_it.Models.Entities;
using Score_it.Views.Profile;
using System;

namespace Score_it.Controllers.Api
{
    public class PlayerController : Controller
    {
        private readonly ScoreItContext _context;

        public PlayerController(ScoreItContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProfileData([FromQuery]PlayerProfileViewModel playerId)
        {
            string  id = "";
            id = playerId.id ?? HttpContext.User.GetUserId();

            var player = _context.Players
                .First(x => x.UserId == id);

           

            var profile = new List<ProfileSummary>();
            var gamesList = new List<GameSummary>();

            var progress = player.Progress;
            var level = player.Level;
            var name = player.Name;
            var rank = player.Rank;
            var wins = player.Wins;
            var losses = player.Losses;
            var points = player.Points;

            var rankings = _context.RankingsData
                .First(x => x.Level == level + 1);

            int pointsForNextLevel = rankings.NextLevelPoints - points;

            var gamesQuery = _context.PlayerGames
                .Include(x => x.Game)
                .ThenInclude(x => x.GamePlayers)
                .ThenInclude(x => x.Player)
                .OrderByDescending(x => x.Game.Date)
                .Where(x => x.PlayerId == player.PlayerId)
                .ToList()
                .Take(2);

            foreach (var game in gamesQuery)
            {
                string teamIdentifier = "team2";
                string status = "win";
                var team1Score = game.Game.Team1Score;
                var team2Score = game.Game.Team2Score;

                string gameResult = team1Score + ":" + team2Score;

                var playerGame = game.Game.GamePlayers;

                string[] team1 = new string[2];
                string[] team2 = new string[2];

                foreach (var players in playerGame)
                {
                    if (players.Team == 0)
                    {
                        if (players.Player.Name == name)
                        {
                            teamIdentifier = "team1";
                        }
                        team1[players.Position] = players.Player.Name;
                    }
                    else
                    {
                        team2[players.Position] = players.Player.Name;
                    }

                    if (teamIdentifier == "team1")
                    {
                        status = team1Score > team2Score ? "win" : "loss";
                    }
                    else
                    {
                        status = team1Score < team2Score ? "win" : "loss";
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
                gamesList.Add(gameSummary);
            }

            var profileSummary = new ProfileSummary
            {
                level = level,
                name = name,
                rank = rank,
                progress = progress,
                wins = wins,
                loses = losses,
                points = points,
                recentGamesData = gamesList,
                pointsToNextLevel = pointsForNextLevel
            };
            profile.Add(profileSummary);

            return Ok(profile);
        }

        [HttpGet]
        public IActionResult GetRankingsList([FromQuery]RankingsViewModel model)
        {
            var playerPlace = 1;
            var counter = 1;
            int pageSize = 2;
            List<Player> rankingList = new List<Player>();
            var query = _context.Players;

            if(model.order == "wins" && model.search == null)
            {
                rankingList = query
                    .OrderByDescending(x => x.Wins)
                    .Take(pageSize*model.page)
                    .ToList();
            }
            else if (model.order == "level" && model.search == null)
            {
                rankingList = query
                    .OrderByDescending(x => x.Level)
                    .ThenByDescending(x => x.Wins)
                    .Take(pageSize * model.page)
                    .ToList();
            }
            else if (model.search != null && model.order == "wins")
            {
                rankingList = query
                    .Where(x => x.Name.Contains(model.search))
                    .OrderByDescending(x => x.Wins)
                    .ThenByDescending(x => x.Level)
                    .Take(pageSize * model.page)
                    .ToList();
            }
            else if (model.search != null && model.order == "level")
            {
                rankingList = query
                    .Where(x => x.Name.Contains(model.search))
                    .OrderByDescending(x => x.Level)
                    .ThenByDescending(x => x.Wins)
                    .Take(pageSize * model.page)
                    .ToList();
            }

            var players = new List<PlayerRankingSummary>();            

            foreach (var player in rankingList)
            {
                var id = player.UserId;
                var level = player.Level;
                var name = player.Name;
                var rank = player.Rank;
                var wins = player.Wins;
                var losses = player.Losses;
                var badge = "";
                var place = "";

                if (counter == 1)
                {
                    badge = "badge gold";
                    place = "1st";
                }
                else if (counter == 2)
                {
                    badge = "badge silver";
                    place = "2nd";
                }
                else if (counter == 3)
                {
                    badge = "badge bronze";
                    place = "3rd";
                }

                var profileSummary = new PlayerRankingSummary
                {
                    level = level,
                    name = name,
                    rank = rank,
                    wins = wins,
                    loses = losses,
                    id = id,
                    place = place,
                    badge = badge,
                    playerPlace = playerPlace
                };
                playerPlace++;
                counter++;
                players.Add(profileSummary);
            }

            return Ok(players);
        }

        [HttpGet]
        public IActionResult GetTopPlayers()
        {
            var topPlayers = _context.Players
                .OrderByDescending(u => u.Wins)
                .Take(3)
                .Select( p => new
                {
                    name = p.Name,
                    id = p.UserId,
                    level = p.Level,
                    progress = p.Progress,
                    rank = p.Rank
                })
                .ToList();

            return Ok(topPlayers);
        }

        [HttpGet]
        public IActionResult GetPickablePlayersList([FromQuery]PlayersListViewModel model)
        {
            //----------------Fetching all players list-----------------------------------
            var playersList = (Object)null;

            //Excluding selected players from the list
            var query = _context.Players
                .Where(x =>
                x.PlayerId != model.selectedPlayersIds[0] &&
                x.PlayerId != model.selectedPlayersIds[1] &&
                x.PlayerId != model.selectedPlayersIds[2] &&
                x.PlayerId != model.selectedPlayersIds[3]);

            if (model.search == null || model.search == "null")
            {
                playersList = query
                    .Select(x => new
                    {
                        id = x.PlayerId,
                        userId = x.UserId,
                        name = x.Name,
                        level = x.Level,
                        progress = x.Progress,
                        rank = x.Rank,
                        wins = x.Wins,
                        losses = x.Losses
                    }).ToList();
            }
            else
            {
                playersList = query
                    .Where(x => x.Name.Contains(model.search))
                    .Select(x => new
                    {
                        id = x.PlayerId,
                        userId = x.UserId,
                        name = x.Name,
                        level = x.Level,
                        progress = x.Progress,
                        rank = x.Rank,
                        wins = x.Wins,
                        losses = x.Losses
                    }).ToList();
            }

            //----------------Fetching recent players list-----------------------------------

            string id = HttpContext.User.GetUserId().ToString();

            var user = _context.Players
                .First(x => x.UserId == id);

            var gamesQuery = _context.PlayerGames
                .Include(x => x.Game)
                .ThenInclude(x => x.GamePlayers)
                .ThenInclude(x => x.Player)
                .OrderByDescending(x => x.Game.Date)
                .Where(x => x.PlayerId == user.PlayerId)
                .ToList()
                .Take(1);

            var playersList2 = new List<ProfileSummary2>();

            foreach (var games in gamesQuery)
            {
                var players = games.Game.GamePlayers;
                foreach (var player in players)
                {
                    if (model.search == null || model.search == "null")
                    {
                        if (player.Player.UserId != id &&
                        player.Player.PlayerId != model.selectedPlayersIds[0] &&
                        player.Player.PlayerId != model.selectedPlayersIds[1] &&
                        player.Player.PlayerId != model.selectedPlayersIds[2] &&
                        player.Player.PlayerId != model.selectedPlayersIds[3])
                        {
                            var playerData = new ProfileSummary2();
                            playerData.losses = player.Player.Losses;
                            playerData.wins = player.Player.Wins;
                            playerData.progress = player.Player.Progress;
                            playerData.id = player.Player.PlayerId;
                            playerData.userId = player.Player.UserId;
                            playerData.rank = player.Player.Rank;
                            playerData.name = player.Player.Name;
                            playerData.level = player.Player.Level;

                            playersList2.Add(playerData);
                        }
                    }
                    else
                    {
                        if (player.Player.UserId != id &&
                        player.Player.PlayerId != model.selectedPlayersIds[0] &&
                        player.Player.PlayerId != model.selectedPlayersIds[1] &&
                        player.Player.PlayerId != model.selectedPlayersIds[2] &&
                        player.Player.PlayerId != model.selectedPlayersIds[3] &&
                        player.Player.Name.Contains(model.search))
                        {
                            var playerData = new ProfileSummary2();
                            playerData.losses = player.Player.Losses;
                            playerData.wins = player.Player.Wins;
                            playerData.progress = player.Player.Progress;
                            playerData.id = player.Player.PlayerId;
                            playerData.userId = player.Player.UserId;
                            playerData.rank = player.Player.Rank;
                            playerData.name = player.Player.Name;
                            playerData.level = player.Player.Level;

                            playersList2.Add(playerData);
                        }
                    }

                }
            }

            //----------------Adding lists to an object--------------------------------------
            var data = new
            {
                allPlayers = playersList,
                recentPlayers = playersList2
            };

            return Ok(data);
        }
    }
}
