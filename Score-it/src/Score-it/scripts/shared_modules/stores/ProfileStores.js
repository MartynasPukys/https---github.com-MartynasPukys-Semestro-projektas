import alt from 'flux-context.js';
import ProfileActions from 'actions/Profile/ProfileActions.js';

class ProfileStores {
    constructor() {
        this.profileData = [];
        this.playerProfileData = [];

        this.bindListeners({
            handleFetchProfileData: ProfileActions.FETCH_PROFILE_DATA,
            handleFetchPlayerProfileData: ProfileActions.FETCH_PLAYER_PROFILE_DATA
        });
    }

    handleFetchProfileData(profileData) {
        this.profileData = profileData;
    }

    handleFetchPlayerProfileData(playerProfileData) {
        this.playerProfileData = playerProfileData;
    }
}

module.exports = alt.createStore(ProfileStores, 'ProfileStores');
