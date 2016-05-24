import React from 'react';
import TopPlayer from './TopPlayer.jsx';

class TopPlayers extends React.Component {
    constructor() {
        super();
        this.state = { badge: '', place: '', counter: 0 };
    }

    render() {
        const topPlayerNodes = this.props.topPlayersData.map((player) => {
            if (this.state.counter === 0) {
                this.state = { badge: 'badge gold', place: '1st', counter: 1 };
            } else if (this.state.counter === 1) {
                this.state = { badge: 'badge silver', place: '2nd', counter: 2 };
            } else if (this.state.counter === 2) {
                this.state = { badge: 'badge bronze', place: '3rd', counter: 0 };
            }
            let progress = 'progress progress-' + player.progress;
            return (
                <TopPlayer
                  badge={this.state.badge} level={player.level}
                  progress={progress} key={player.id} place={this.state.place}
                  name={player.name} rank={player.rank}
                />
            );
        });

        return (
            <div className="wrapper profile-data-wrapper">
                {topPlayerNodes}
            </div>
        );
    }
}

TopPlayers.propTypes = {
    topPlayersData: React.PropTypes.array
};

export default TopPlayers;
