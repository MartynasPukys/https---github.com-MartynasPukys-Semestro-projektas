import React from 'react';
import { connect } from 'alt-react';
import cookie from 'react-cookie';

import UserProfile from 'UserProfile/UserProfile.jsx';
import RecentGames from 'RecentGames/RecentGames.jsx';

import ProfileActions from 'actions/Profile/ProfileActions.js';
import ProfileStore from 'stores/ProfileStores.js';

class ProfileBox extends React.Component {

    componentDidMount() {
        ProfileActions.fetchProfileData(cookie.load('email'));
    }

    render() {
        return (
            <div className="wrapper">
                <UserProfile playerProfileData={this.props.profileData} />
                <RecentGames profileData={this.props.profileData} />
            </div>
        );
    }
}

ProfileBox.propTypes = {
    profileData: React.PropTypes.array,
    children: React.PropTypes.string
};

ProfileBox = connect(ProfileBox, {
    listenTo() {
        return [ProfileStore];
    },
    getProps() {
        const state = ProfileStore.getState();
        return {
            profileData: state.profileData
        };
    }
});

export default ProfileBox;
