import React from 'react';
import PlayerListItem from './PlayersListItem.jsx';

class PlayersList extends React.Component {
    render() {
        let playerNodes;
        if (this.props.playerData) {
            playerNodes = this.props.playerData.map((player) => {
                return (
                    <PlayerListItem
                      level={player.level}
                      wins={player.wins} key={player.id}
                      name={player.name} losses={player.losses}
                      id={player.id} rank={player.rank}
                      forSelect={'true'} userId={player.userId}
                    />
            );
            });
        }

        return (
            <div>
                {playerNodes}
            </div>
        );
    }

}

PlayersList.propTypes = {
    playerData: React.PropTypes.array
};

export default PlayersList;
