import React from 'react';

class Player extends React.Component {
    render() {
        const playerNodes = this.props.profileData.map((player) => {
            const profileData = player || {};
            let progress = 'progress progress-' + profileData.progress;
            return (
                <div key={profileData.id}>
                    <div className="profile-avatar">
                        <div className={progress} />
                        <img alt src="http://placehold.it/92x92" />
                        <i>{profileData.level}</i>
                        <span className={profileData.badge}>{profileData.place}</span>
                    </div>
                    <h1 className="profile-name">
                        <option value={profileData.name}>{profileData.name}</option>
                        <span>{profileData.rank}</span>
                    </h1>
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

Player.propTypes = {
    profileData: React.PropTypes.array
};

export default Player;
