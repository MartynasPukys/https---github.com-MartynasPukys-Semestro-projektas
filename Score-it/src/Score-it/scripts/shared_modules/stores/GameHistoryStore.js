import alt from 'flux-context.js';
import GameHistoryActions from 'actions/Game/GameHistoryActions.js';

class GameHistoryStore {
    constructor() {
        this.recentGamesData = [];

        this.bindListeners({
            handleFetchRecentGamesData: GameHistoryActions.FETCH_RECENT_GAMES_DATA
        });
    }

    handleFetchRecentGamesData(recentGamesData) {
        this.recentGamesData = recentGamesData;
    }
}

module.exports = alt.createStore(GameHistoryStore, 'GameHistoryStore');
