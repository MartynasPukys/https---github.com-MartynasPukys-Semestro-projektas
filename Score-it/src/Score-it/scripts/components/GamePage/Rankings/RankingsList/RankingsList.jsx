import React from 'react';
import Ranking from './Ranking.jsx';

class RankingsList extends React.Component {
    render() {
        const playerNodes = this.props.playerData.map((player) => {
            return (
                <Ranking badge={player.badge} level={player.level}
                  wins={player.wins} key={player.id} place={player.place}
                  name={player.name} rank={player.rank} loses={player.loses}
                  playerPlace={player.playerPlace} id={player.id}
                />
            );
        });

        return (
            <div>
                {playerNodes}
            </div>
        );
    }
}

RankingsList.propTypes = {
    playerData: React.PropTypes.array
};

export default RankingsList;
