import React from 'react';
import Modal from 'react-modal';

import PlayerBox from './PlayerBox.jsx';

class Ranking extends React.Component {
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
        return (
            <a onClick={this.handleOpenModal} href="#" className="player">
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
                            <PlayerBox>
                                {this.props.id}
                            </PlayerBox>
                        </div>
                    </div>
                </Modal>

                <div className="player-place">
                    {this.props.playerPlace}.
                </div>
                <div style={{ backgroundImage: 'url(http://placehold.it/54x54)' }} className="player-avatar">
                    <span className="level">
                        <i>{this.props.level}</i>
                    </span>
                    <i className={this.props.badge}>{this.props.place}</i>
                </div>
                <div className="player-meta">
                    <span className="player-name">
                        {this.props.name}
                    </span>
                    <span className="player-level">
                        {this.props.rank}
                    </span>
                    <span className="player-stats">
                        <i>/</i> W
                        <strong>{this.props.wins}</strong>
                        <i>/</i> L
                        <strong>{this.props.loses}</strong>
                    </span>
                </div>
                <i className="icon-chevron" />
            </a>
        );
    }
}

Ranking
    .propTypes = {
        level: React.PropTypes.number.isRequired,
        badge: React.PropTypes.string.isRequired,
        place: React.PropTypes.string.isRequired,
        playerPlace: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        rank: React.PropTypes.string.isRequired,
        wins: React.PropTypes.number.isRequired,
        loses: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired
    };

export default Ranking;
