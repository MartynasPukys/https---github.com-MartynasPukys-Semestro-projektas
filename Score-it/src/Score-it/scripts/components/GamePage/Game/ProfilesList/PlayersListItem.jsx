import React from 'react';
import GamePageActions from '../../../../shared_modules/actions/Game/GamePageActions.js';
import GameStore from '../../../../shared_modules/stores/GameStore.js';
import Modal from 'react-modal';
import { connect } from 'alt-react';
import PlayerBox from '../../Rankings/RankingsList/PlayerBox.jsx';

class PlayersListItem extends React.Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };

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

        this.profileSelect = this.profileSelect.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    profileSelect() {
        const player = {
            level: this.props.level,
            name: this.props.name,
            wins: this.props.wins,
            losses: this.props.losses,
            rank: this.props.rank,
            id: this.props.id,
            userId: this.props.userId
        };

        if (this.props.forSelect === 'true') {
            GamePageActions.playerSelected(player);
            GamePageActions.closeModal();
        } else if (this.props.forSelect === 'false') {
            this.setState({ modalIsOpen: true });
        }
    }

    handleCloseModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <a className="player" href="#" onClick={this.profileSelect}>
                    <div className="player-avatar" style={{ backgroundImage: 'url(http://placehold.it/54x54)' }}>
                        <span className="level">
                            <i>{this.props.level}</i>
                        </span>
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
                            <strong>{this.props.losses}</strong>
                        </span>
                    </div>
                    <i className="icon-chevron"></i>
                </a>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.handleCloseModal}
                  style={this.modalStyle}
                >
                    <div id="profile" className="modal">
                        <div className="modal-header">
                            <button
                              onClick={this.handleCloseModal}
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

            </div>
        );
    }
}

PlayersListItem
    .propTypes = {
        level: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        wins: React.PropTypes.number.isRequired,
        losses: React.PropTypes.number.isRequired,
        rank: React.PropTypes.string.isRequired,
        userId: React.PropTypes.string,
        forSelect: React.PropTypes.string.isRequired
    };

PlayersListItem = connect(PlayersListItem, {
    listenTo() {
        return [GameStore];
    },
    getProps() {
        const state2 = GameStore.getState();
        return {
            playersSelected: state2.playersSelected,
            feedbackModalIsOpen: state2.feedbackModalIsOpen,
            userSelectModalIsOpen: state2.feedbackModalIsOpen
        };
    }
});

export default PlayersListItem;
