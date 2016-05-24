import React from 'react';
import GameStore from '../../../shared_modules/stores/GameStore.js';
import { connect } from 'alt-react';

import NewGame from './NewGame.jsx';
import GameInProgress from './GameInProgress.jsx';
import GameFinished from './GameFinished.jsx';

class GameScreenNavigation extends React.Component {
    render() {
        switch (this.props.gameStage) {
        case 'game-start':
            return (
                <div className = "wrapper">
                    <NewGame />
                </div>
            );
        case 'game-play':
            return (
                <div className = "wrapper">
                    <GameInProgress />
                </div>
            );
        case 'game-finished':
            return (
                <div className = "wrapper">
                    <GameFinished />
                </div>
                );
        default:
            return (
                <div className = "wrapper">
                    <NewGame />
                </div>
            );
        }
    }
}

GameScreenNavigation.propTypes = {
    gameStage: React.PropTypes.string
};

GameScreenNavigation = connect(GameScreenNavigation, {
    listenTo() {
        return [GameStore];
    },
    getProps() {
        const state = GameStore.getState();
        return {
            gameStage: state.gameStage
        };
    }
});

export default GameScreenNavigation;
