import React from 'react';
import { connect } from 'alt-react';

import UserProfile from 'UserProfile/UserProfile.jsx';
import RecentGames from 'RecentGames/RecentGames.jsx';

import ProfileActions from 'actions/Profile/ProfileActions.js';
import ProfileStore from 'stores/ProfileStores.js';

class ProfileBox extends React.Component {

    componentDidMount() {
        ProfileActions.fetchPlayerProfileData(this.props.children);
    }

    render() {
        return (
            <div>
                <UserProfile playerProfileData={this.props.playerProfileData} />
                <RecentGames profileData={this.props.playerProfileData} />
            </div>
        );
    }
}

ProfileBox.propTypes = {
    playerProfileData: React.PropTypes.array,
    children: React.PropTypes.string
};

ProfileBox = connect(ProfileBox, {
    listenTo() {
        return [ProfileStore];
    },
    getProps() {
        const state = ProfileStore.getState();
        return {
            playerProfileData: state.playerProfileData
        };
    }
});

export default ProfileBox;
