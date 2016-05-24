import React from 'react';
import Player from 'Player/Player.jsx';
import ProfileStats from './ProfileStats/ProfileStats.jsx';

class ProfileBox extends React.Component {
    render() {
        return (
            <div className="profile-data">
                <Player profileData={this.props.playerProfileData} />
                <ProfileStats profileData={this.props.playerProfileData} />
            </div>
        );
    }
}

ProfileBox.propTypes = {
    playerProfileData: React.PropTypes.array
};

export default ProfileBox;
