import alt from 'flux-context.js';
import GamePageActions from '../actions/Game/GamePageActions.js';

class GameStore {
    constructor() {
        this.scoreBlue = 0;
        this.scoreRed = 0;
        this.gameStage = 'game-start';
        this.goalLimit = 0;
        this.selectedPlayersData = [null, null, null, null];
        this.selectedPlayersIds = [-1, -1, -1, -1];

        this.allPlayersData = {};
        this.selectingPlayer = -1;
        this.RemoveModalIsOpen = false;
        this.userSelectModalIsOpen = false;
        this.playersSelected = [false, false, false, false];
        this.bindListeners({
            handleScoreChangeBlue: GamePageActions.CHANGE_SCORE_BLUE,
            handleScoreChangeRed: GamePageActions.CHANGE_SCORE_RED,
            handleSetGoalLimit: GamePageActions.SET_GOAL_LIMIT,
            handleGameStageChange: GamePageActions.GAME_STAGE_CHANGE,
            handleFetchAllPlayersData: GamePageActions.FETCH_ALL_PLAYERS_DATA,
            handleOpenModal: GamePageActions.OPEN_MODAL,
            handleCloseModal: GamePageActions.CLOSE_MODAL,
            handleRemovePlayer: GamePageActions.HANDLE_REMOVE_PLAYER,
            handlePlayerSelected: GamePageActions.PLAYER_SELECTED,
            handlePlayerSelecting: GamePageActions.PLAYER_SELECTING,
            handleRematch: GamePageActions.REMATCH,
            handleNewGame: GamePageActions.NEW_GAME
        });
    }

    handleRematch() {
        this.scoreBlue = 0;
        this.scoreRed = 0;
        this.gameStage = 'game-start';
    }

    handleNewGame() {
        this.scoreBlue = 0;
        this.scoreRed = 0;
        this.gameStage = 'game-start';
        this.selectedPlayersData = [null, null, null, null];
        this.playersSelected = [false, false, false, false];
        this.selectedPlayersIds = [-1, -1, -1, -1];
    }

    handleOpenModal(modalType) {
        if (modalType === 'select') {
            GamePageActions.fetchAllPlayersData(null, this.selectedPlayersIds);
            this.userSelectModalIsOpen = true;
        } else if (modalType === 'remove') {
            this.RemoveModalIsOpen = true;
        }
    }

    handleRemovePlayer() {
        this.selectedPlayersData[this.selectingPlayer] = null;
        this.playersSelected[this.selectingPlayer] = false;
        this.selectedPlayersIds[this.selectingPlayer] = -1;
    }

    handlePlayerSelecting(buttonNumber) {
        this.selectingPlayer = buttonNumber;
    }

    handlePlayerSelected(player) {
        this.playersSelected[this.selectingPlayer] = true;
        this.selectedPlayersData[this.selectingPlayer] = player;
        this.selectedPlayersIds[this.selectingPlayer] = player.id;
    }

    handleCloseModal() {
        this.RemoveModalIsOpen = false;
        this.userSelectModalIsOpen = false;
    }

    handleScoreChangeBlue(blue) {
        if (this.goalLimit >= blue && blue > 0) {
            this.scoreBlue = blue;
        }
    }

    handleScoreChangeRed(red) {
        if (this.goalLimit >= red && red > 0) {
            this.scoreRed = red;
        }
    }

    handleSetGoalLimit(limit) {
        this.goalLimit = limit;
    }

    handleGameStageChange(stage) {
        this.gameStage = stage;
    }

    handleFetchAllPlayersData(data) {
        this.allPlayersData = data;
    }
}

module.exports = alt.createStore(GameStore, 'GameStore');
