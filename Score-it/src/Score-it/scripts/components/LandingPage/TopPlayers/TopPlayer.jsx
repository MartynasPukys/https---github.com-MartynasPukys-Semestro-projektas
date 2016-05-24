import React from 'react';

class TopPlayer extends React.Component {
    render() {
        return (
            <div className="profile-data">
                <div className="profile-avatar">
                    <div className={this.props.progress} />
                    <img alt src="http://placehold.it/92x92" />
                    <i>{this.props.level}</i>
                    <span className={this.props.badge}>{this.props.place}</span>
                </div>
                <h1 className="profile-name">
                    <option value={this.props.name}>{this.props.name}</option>
                    <span>{this.props.rank}</span>
                </h1>
            </div>
        );
    }
}

TopPlayer.propTypes = {
    progress: React.PropTypes.string.isRequired,
    level: React.PropTypes.number.isRequired,
    badge: React.PropTypes.string.isRequired,
    place: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    rank: React.PropTypes.string.isRequired
};

export default TopPlayer;
