import React from 'react';
import Game from 'Game/Game.jsx';


class RecentGames extends React.Component {
    render() {
        let recentGamesNodes = [];

        if (this.props.profileData && this.props.profileData.length) {
            recentGamesNodes = this.props.profileData[0].recentGamesData.map((game) => {
                let state = 'history-item ' + game.state;
                return (
                    <Game
                      key={game.id} state={state} playerName={game.playerName}
                      teammateName={game.teammateName} result={game.result}
                      opponentName={game.opponentName}
                      opponentTeammateName={game.opponentTeammateName}
                    />
                );
            });
        }

        return (
            <ol className="history wrapper">
                {recentGamesNodes}
            </ol>
        );
    }
}


RecentGames.propTypes = {
    profileData: React.PropTypes.array
};

export default RecentGames;
