import React from 'react';
import Game from 'Game/Game.jsx';

class AllRecentGames extends React.Component {
    render() {
        const recentGamesNodes = this.props.recentGamesData.map((game) => {
            let state = 'history-item ' + game.state;
            return (
                <Game
                  key={game.id} state={state} playerName={game.playerName}
                  teammateName={game.teammateName} result={game.result}
                  opponentName={game.opponentName} opponentTeammateName={game.opponentTeammateName}
                />
            );
        });

        return (
            <ol className="history wrapper">
                {recentGamesNodes}
            </ol>
        );
    }
}


AllRecentGames.propTypes = {
    recentGamesData: React.PropTypes.array
};

export default AllRecentGames;
