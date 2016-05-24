import alt from 'flux-context.js';
import axios from 'axios';

class ProfileActions {
    fetchProfileData() {
        return function(dispatch) {
            axios.get('/player/GetProfileData')
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }

    fetchPlayerProfileData(playerProfileId) {
        return function(dispatch) {
            axios.get('/player/GetProfileData?id=' + playerProfileId)
            .then(response => {
                dispatch(response.data);
            })
            .catch(response => {
                console.log(response);
            });
        };
    }
}

module.exports = alt.createActions(ProfileActions);
