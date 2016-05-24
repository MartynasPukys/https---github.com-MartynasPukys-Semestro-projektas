import React from 'react';
import { connect } from 'alt-react';

import PlayerListItem from './ProfilesList/PlayersListItem.jsx';
import GameStore from '../../../shared_modules/stores/GameStore.js';
import GamePageActions from '../../../shared_modules/actions/Game/GamePageActions.js';

class GameInProgress extends React.Component {

    constructor() {
        super();
        this.state = {
            id1: -5
        };
        this.incrementValue = this.incrementValue.bind(this);
        this.decrementValue = this.decrementValue.bind(this);
        this.handleCancelGame = this.handleCancelGame.bind(this);
        this.handleFinishGame = this.handleFinishGame.bind(this);
    }

    incrementValue(event) {
        const id = event.target.id;

        if (id === 'blue-plus') {
            GamePageActions.changeScoreBlue(this.props.blueValue + 1);
        } else if (id === 'red-plus') {
            GamePageActions.changeScoreRed(this.props.redValue + 1);
        }
    }

    decrementValue(event) {
        const id = event.target.id;

        if (id === 'blue-minus') {
            GamePageActions.changeScoreBlue(this.props.blueValue - 1);
        } else if (id === 'red-minus') {
            GamePageActions.changeScoreRed(this.props.redValue - 1);
        }
    }

    handleCancelGame() {
        GamePageActions.newGame();
    }

    handleFinishGame() {
        const GameData = {
            Team1Score: this.props.blueValue,
            Team2Score: this.props.redValue,
            Team1Player1Id: this.props.selectedPlayersData[0].id,
            Team1Player2Id: this.props.selectedPlayersData[1].id,
            Team2Player1Id: this.props.selectedPlayersData[2].id,
            Team2Player2Id: this.props.selectedPlayersData[3].id
        };

        GamePageActions.postGameResults(GameData);
        GamePageActions.gameStageChange('game-finished');
    }

    render() {
        return (
            <div>
                <section className="game-play">
                    <div className="game-play-scoreboard">
                        <h1>Quick Game</h1>

                        <div className="game-play-scoreboard-item blue">
                            <button
                              className="icon-minus" id="blue-minus"
                              onClick={this.decrementValue}
                            ></button>

                            <input type="text" readOnly value={this.props.blueValue} />

                            <button
                              className="icon-plus" id="blue-plus"
                              onClick={this.incrementValue}
                            ></button>
                        </div>

                        <div className="game-play-scoreboard-item red">
                            <button
                              className="icon-minus" id="red-minus"
                              onClick={this.decrementValue}
                            ></button>

                            <input type="text" readOnly value={this.props.redValue} />

                            <button
                              className="icon-plus" id="red-plus"
                              onClick={this.incrementValue}
                            ></button>
                        </div>
                    </div>
                </section>
                <section className="game-play-players">
                    <h1>
                        Playing Teams
                    </h1>

                    <div className="game-play-players-group blue">

                        <PlayerListItem
                          level={this.props.selectedPlayersData[0].level}
                          wins={this.props.selectedPlayersData[0].wins}
                          key={this.props.selectedPlayersData[0].id}
                          name={this.props.selectedPlayersData[0].name}
                          rank={this.props.selectedPlayersData[0].rank}
                          losses={this.props.selectedPlayersData[0].losses}
                          id={this.props.selectedPlayersData[0].userId}
                          forSelect={'false'}
                        />

                        <PlayerListItem
                          level={this.props.selectedPlayersData[1].level}
                          wins={this.props.selectedPlayersData[1].wins}
                          key={this.props.selectedPlayersData[1].id}
                          name={this.props.selectedPlayersData[1].name}
                          rank={this.props.selectedPlayersData[1].rank}
                          losses={this.props.selectedPlayersData[1].losses}
                          id={this.props.selectedPlayersData[1].userId}
                          forSelect={'false'}
                        />
                    </div>

                    <div className="game-play-players-group red">
                        <PlayerListItem
                          level={this.props.selectedPlayersData[2].level}
                          wins={this.props.selectedPlayersData[2].wins}
                          key={this.props.selectedPlayersData[2].id}
                          name={this.props.selectedPlayersData[2].name}
                          rank={this.props.selectedPlayersData[2].rank}
                          losses={this.props.selectedPlayersData[2].losses}
                          id={this.props.selectedPlayersData[2].userId}
                          forSelect={'false'}
                        />

                        <PlayerListItem
                          level={this.props.selectedPlayersData[3].level}
                          wins={this.props.selectedPlayersData[3].wins}
                          key={this.props.selectedPlayersData[3].id}
                          name={this.props.selectedPlayersData[3].name}
                          rank={this.props.selectedPlayersData[3].rank}
                          losses={this.props.selectedPlayersData[3].losses}
                          id={this.props.selectedPlayersData[3].userId}
                          forSelect={'false'}
                        />

                    </div>
                </section>

                <section>
                    <div className="game-play-controls">
                        <button className="button" onClick={this.handleFinishGame}>
                                Finish Game
                        </button>

                        <button className="button borderless" onClick={this.handleCancelGame}>
                            Cancel Game
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}

GameInProgress.propTypes = {
    selectedPlayersData: React.PropTypes.array,
    blueValue: React.PropTypes.number,
    redValue: React.PropTypes.number
};

GameInProgress = connect(GameInProgress, {
    listenTo() {
        return [GameStore];
    },
    getProps() {
        const state = GameStore.getState();
        return {
            selectedPlayersData: state.selectedPlayersData,
            blueValue: state.scoreBlue,
            redValue: state.scoreRed
        };
    }
});

export default GameInProgress;
