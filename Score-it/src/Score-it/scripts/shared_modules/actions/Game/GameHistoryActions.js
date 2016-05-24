import alt from 'flux-context.js';
import axios from 'axios';

class GameHistoryActions {

    fetchRecentGamesData(page) {
        return function(dispatch) {
            axios.get('/game/getgamelist?page=' + page)
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }
}

module.exports = alt.createActions(GameHistoryActions);
