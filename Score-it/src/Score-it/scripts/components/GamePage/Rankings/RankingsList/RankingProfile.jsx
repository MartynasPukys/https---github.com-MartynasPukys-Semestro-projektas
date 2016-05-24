import React from 'react';
import Modal from 'react-modal';

import ProfileBox from '../../Profile/ProfileBox.jsx';

class RankingProfile extends React.Component {
    constructor() {
        super();
        this.state = { modalIsOpen: false };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.modalStyle = {
            overlay: {
                zIndex: 99999,
                right: 0,
                bottom: 0,
                top: 0,
                left: 'auto',
                backgroundColor: 'rgba(0,0,0,0.8)'
            }
        };
    }

    handleOpenModal() {
        this.setState({ modalIsOpen: true });
    }

    handleCloseModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const playerNodes = this.props.profileData.map((player) => {
            const profileData = player || {};

            return (
                <a onClick={this.handleOpenModal} href="#"
                  className="player current" key={profileData.id}
                >
                    <Modal isOpen={this.state.modalIsOpen}
                      onRequestClose={this.handleCloseModal}
                      style={this.modalStyle}
                    >
                        <div id="profile" className="modal">
                            <div className="modal-header">
                                <button onClick={this.handleCloseModal}
                                  className="modal-close icon-close"
                                />
                                <h1>Profile</h1>
                            </div>
                            <div className="modal-content">
                                <ProfileBox />
                            </div>
                        </div>
                    </Modal>

                    <div className="player-place">
                        {profileData.playerPlace}
                    </div>
                    <div style={{ backgroundImage: 'url(http://placehold.it/54x54)' }} className="player-avatar">
                        <span className="level">
                            <i>{profileData.level}</i>
                        </span>
                        <i className={profileData.badge}>{profileData.place}</i>
                    </div>
                    <div className="player-meta">
                        <span className="player-name">
                            {profileData.name}
                        </span>
                        <span className="player-level">
                            {profileData.rank}
                        </span>
                        <span className="player-stats">
                            <i>/</i> W
                            <strong>{profileData.wins}</strong>
                            <i>/</i> L
                            <strong>{profileData.loses}</strong>
                        </span>
                    </div>
                    <i className="icon-chevron" />
                </a>
            );
        });
        return (
            <div>
                {playerNodes}
            </div>
        );
    }
}

RankingProfile.propTypes = {
    profileData: React.PropTypes.array
};

export default RankingProfile;
