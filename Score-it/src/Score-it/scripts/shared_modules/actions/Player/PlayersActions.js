import alt from 'flux-context.js';
import axios from 'axios';

class PlayersActions {

    fetchPlayersData() {
        return function(dispatch) {
            axios.get('/player/gettopplayers')
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }

    fetchRankingListData(order) {
        return function(dispatch) {
            axios.get('/player/GetRankingsList?order=' + order)
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }

    fetchRankingListDataSearch(search, order, page) {
        return function(dispatch) {
            axios.get('/player/GetRankingsList?search=' +
             search + '&order=' + order + '&page=' + page)
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }
}

module.exports = alt.createActions(PlayersActions);
