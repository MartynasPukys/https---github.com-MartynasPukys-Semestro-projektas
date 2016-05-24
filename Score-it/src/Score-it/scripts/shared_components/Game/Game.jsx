import React from 'react';

class Game extends React.Component {
    render() {
        return (
            <li className={this.props.state}>
                <div className="history-item-team">
                    {this.props.playerName}
                    <br />
                    {this.props.teammateName}
                </div>
                <div className="history-item-result">
                    {this.props.result}
                </div>
                <div className="history-item-team">
                    {this.props.opponentName}
                    <br />
                    {this.props.opponentTeammateName}
                </div>
            </li>
        );
    }
}

Game.propTypes = {
    state: React.PropTypes.string.isRequired,
    playerName: React.PropTypes.string.isRequired,
    teammateName: React.PropTypes.string.isRequired,
    result: React.PropTypes.string.isRequired,
    opponentName: React.PropTypes.string.isRequired,
    opponentTeammateName: React.PropTypes.string.isRequired
};

export default Game;
