import React from 'react';

class ProfileStats extends React.Component {
    render() {
        const playerNodes = this.props.profileData.map((player) => {
            const profileData = player || {};

            return (
                <div key={profileData.id}>
                    <div className="profile-points-left">
                        {profileData.pointsToNextLevel} points to reach next rank
                        <br />
                        <label className="file-input">
                            <span>Change Profile Picture</span>
                            <input type="file" />
                        </label>
                    </div>
                    <ol className="profile-stats">
                        <li>
                            <span>Points</span>
                            <option value={profileData.points}>{profileData.points}</option>
                        </li>
                        <li>
                            <span>Wins</span>
                            <option value={profileData.wins}>{profileData.wins}</option>
                        </li>
                        <li>
                            <span>Losses</span>
                            <option value={profileData.loses}>{profileData.loses}</option>
                        </li>
                    </ol>
                </div>
            );
        });

        return (
            <div>
                {playerNodes}
            </div>
        );
    }
}

ProfileStats.propTypes = {
    profileData: React.PropTypes.array
};

export default ProfileStats;
