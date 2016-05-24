import alt from 'flux-context.js';
import axios from 'axios';

class GamePageActions {

    changeScoreBlue(blue) {
        return function(dispatch) {
            dispatch(blue);
        };
    }

    changeScoreRed(red) {
        return function(dispatch) {
            dispatch(red);
        };
    }

    openModal(modalType) {
        return function(dispatch) {
            dispatch(modalType);
        };
    }

    rematch() {
        return function(dispatch) {
            dispatch();
        };
    }

    newGame() {
        return function(dispatch) {
            dispatch();
        };
    }

    playerSelecting(buttonNumber) {
        return function(dispatch) {
            dispatch(buttonNumber);
        };
    }

    playerSelected(player) {
        return function(dispatch) {
            dispatch(player);
        };
    }

    closeModal() {
        return function(dispatch) {
            dispatch();
        };
    }

    gameStageChange(stage) {
        return function(dispatch) {
            dispatch(stage);
        };
    }

    handleRemovePlayer() {
        return function(dispatch) {
            dispatch();
        };
    }

    setGoalLimit(limit) {
        return function(dispatch) {
            dispatch(limit);
        };
    }

    fetchAllPlayersData(search, selectedPlayersIds) {
        return function(dispatch) {
            axios.get('/player/getpickableplayerslist?search=' + search
            + '&selectedPlayersIds=' + selectedPlayersIds[0]
            + '&selectedPlayersIds=' + selectedPlayersIds[1]
            + '&selectedPlayersIds=' + selectedPlayersIds[2]
            + '&selectedPlayersIds=' + selectedPlayersIds[3])
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }

    postGameResults(gameResultsModel) {
        return () => {
            axios.post('game/submitgame', gameResultsModel)
                .catch((response) => {
                    console.log(response);
                });
        };
    }
}

module.exports = alt.createActions(GamePageActions);
