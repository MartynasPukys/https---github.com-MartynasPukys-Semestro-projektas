import alt from 'flux-context.js';
import PlayersActions from 'actions/Player/PlayersActions.js';

class PlayersStore {
    constructor() {
        this.playersData = [];
        this.rankingsData = [];

        this.bindListeners({
            handleFetchPlayersData: PlayersActions.FETCH_PLAYERS_DATA,
            handleFetchRankingListData: PlayersActions.FETCH_RANKING_LIST_DATA,
            handleFetchRankingListDataSearch: PlayersActions.FETCH_RANKING_LIST_DATA_SEARCH
        });
    }

    handleFetchPlayersData(playersData) {
        this.playersData = playersData;
    }

    handleFetchRankingListData(rankingsData) {
        this.rankingsData = rankingsData;
    }

    handleFetchRankingListDataSearch(rankingsData) {
        this.rankingsData = rankingsData;
    }
}

module.exports = alt.createStore(PlayersStore, 'PlayersStore');
