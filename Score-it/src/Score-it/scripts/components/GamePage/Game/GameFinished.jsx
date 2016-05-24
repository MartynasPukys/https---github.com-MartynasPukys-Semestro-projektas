import React from 'react';
import { connect } from 'alt-react';

import GameStore from '../../../shared_modules/stores/GameStore.js';
import GamePageActions from '../../../shared_modules/actions/Game/GamePageActions.js';

class GameFinished extends React.Component {
    constructor() {
        super();
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleRematch = this.handleRematch.bind(this);
    }

    handleNewGame() {
        GamePageActions.newGame();
    }

    handleRematch() {
        GamePageActions.rematch();
    }

    render() {
        return (
            <section className="game-finished">
                <h1>Result</h1>
                <div className="game-result win">
                        {this.props.scoreBlue} : {this.props.scoreRed}
                </div>

                <button className="button" onClick={this.handleNewGame}>
                    New Game
                </button>

                <button className="button link" onClick={this.handleRematch}>
                        Rematch
                </button>
            </section>
        );
    }
}

GameFinished.propTypes = {
    scoreBlue: React.PropTypes.number,
    scoreRed: React.PropTypes.number
};

GameFinished = connect(GameFinished, {
    listenTo() {
        return [GameStore];
    },
    getProps() {
        const state = GameStore.getState();
        return {
            scoreBlue: state.scoreBlue,
            scoreRed: state.scoreRed
        };
    }
});

export default GameFinished;
