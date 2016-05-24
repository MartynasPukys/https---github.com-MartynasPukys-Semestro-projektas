import React from 'react';
import Modal from 'react-modal';
import { connect } from 'alt-react';
import SearchInput from 'react-search-input';

import GamePageActions from '../../../shared_modules/actions/Game/GamePageActions.js';
import GameStore from '../../../shared_modules/stores/GameStore.js';

import PlayersList from './ProfilesList/PlayersList.jsx';
import MainButton from './Button/MainButton.jsx';

class NewGame extends React.Component {

    constructor() {
        super();
        this.state = {
            value: 7,
            error: ''
        };

        this.errors = '';
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

        this.handleChange = this.handleChange.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.changeGameStage = this.changeGameStage.bind(this);
        this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
        this.handlePlayerSearch = this.handlePlayerSearch.bind(this);
    }

    changeGameStage() {
        if (this.props.playersSelected[0] === true &&
           this.props.playersSelected[1] === true &&
           this.props.playersSelected[2] === true &&
           this.props.playersSelected[3] === true) {
            this.errors = '';
            GamePageActions.setGoalLimit(this.state.value);
            GamePageActions.gameStageChange('game-play');
        } else {
            this.setState({ error: ' ' });
            this.errors =
            (<div className="alert green">
                  {'Not all players have been selected!' + this.state.error}
            </div>);
        }
    }

    handleRemovePlayer() {
        GamePageActions.handleRemovePlayer();
        GamePageActions.closeModal();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleCloseModal() {
        GamePageActions.closeModal();
    }

    handlePlayerSearch(term) {
        const search = term;
        GamePageActions.fetchAllPlayersData(search, this.props.selectedPlayersIds);
    }

    render() {
        const divStyle = {
            display: 'block'
        };

        const icons = [];
        for (let i = 0; i < 11; i++) {
            let element = <i key={i}></i>;
            if (i < this.state.value - 1) {
                element = <i className="selected" key={i}></i>;
            }
            icons.push(element);
        }

        return (

            <div className="page-game">
                <section className="game-setup" style={divStyle}>
                    <h1> {this.props.userSelectModalIsOpen} </h1>
                    {this.errors}
                    <div className="game-setup-players">
                        <div className="game-setup-players-item">
                            <MainButton
                              selected={this.props.playersSelected[0]}
                              number={0}
                            />
                            <MainButton
                              selected={this.props.playersSelected[1]}
                              number={1}
                            />
                        </div>

                        <div className="game-setup-players-item">
                            <MainButton
                              selected={this.props.playersSelected[2]}
                              number={2}
                            />
                            <MainButton
                              selected={this.props.playersSelected[3]}
                              number={3}
                            />
                        </div>
                    </div>

                    <div className="game-setup-goals">
                        <h2>
                            {'Goal limit '}
                            <input type="text" readOnly value={this.state.value} />
                        </h2>

                        <div className="game-setup-goals-input">
                            <input
                              type="range" min="1" max="11" value={this.state.value}
                              onChange={this.handleChange}
                            />
                            <div className="game-setup-goals-input-pips" key={'121213'}>
                                {icons}
                            </div>
                        </div>
                    </div>

                    <button className="button" onClick={this.changeGameStage}>
                            Start Game
                    </button>
                </section>

                <Modal
                  isOpen={this.props.RemoveModalIsOpen}
                  onRequestClose={this.handleCloseModal}
                  style={this.modalStyle}
                >
                    <div className="modal" id="alert">
                        <div className="modal-header">
                            <button
                              className="modal-close icon-close"
                              onClick={this.handleCloseModal}
                            ></button>
                            <h1>
                                Removing selected user
                            </h1>
                        </div>

                        <div className="modal-content">
                            <p>Do you really want to remove selected player?</p>

                            <button className="button blue" onClick={this.handleRemovePlayer}>
                                    Yes
                            </button>

                            <button className="button red" onClick={this.handleCloseModal}>
                                    No
                            </button>
                        </div>
                    </div>
                </Modal>

                <Modal
                  isOpen={this.props.userSelectModalIsOpen}
                  onRequestClose={this.handleCloseModal}
                  style={this.modalStyle}
                >

                    <div className="modal with-search" id="players">
                        <div className="modal-header">
                            <button
                              className="modal-close icon-close"
                              onClick={this.handleCloseModal}
                            ></button>
                            <h1>
                                        Select a Player
                            </h1>
                        </div>

                        <SearchInput
                          className="search"
                          type="text" placeholder="Search by Name"
                          onChange={this.handlePlayerSearch} throttle={800}
                        />

                        <div className="modal-content">
                            <span className="player-group-separator">Recent:</span>
                            <PlayersList playerData={this.props.allPlayersData.recentPlayers} />
                            <span className="player-group-separator">All:</span>
                            <PlayersList playerData={this.props.allPlayersData.allPlayers} />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

NewGame.propTypes = {
    allPlayersData: React.PropTypes.object,
    playersSelected: React.PropTypes.array,
    RemoveModalIsOpen: React.PropTypes.bool,
    userSelectModalIsOpen: React.PropTypes.bool,
    selectedPlayersIds: React.PropTypes.array
};

NewGame = connect(NewGame, {
    listenTo() {
        return [GameStore];
    },
    getProps() {
        const state2 = GameStore.getState();
        return {
            allPlayersData: state2.allPlayersData,
            playersSelected: state2.playersSelected,
            RemoveModalIsOpen: state2.RemoveModalIsOpen,
            userSelectModalIsOpen: state2.userSelectModalIsOpen,
            selectedPlayersIds: state2.selectedPlayersIds
        };
    }
});

export default NewGame;
