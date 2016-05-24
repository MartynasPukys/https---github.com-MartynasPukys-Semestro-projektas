import React from 'react';
import GamePageActions from '../../../../shared_modules/actions/Game/GamePageActions.js';

class RemovePlayerButton extends React.Component {
    constructor() {
        super();
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal() {
        GamePageActions.openModal('remove');
        GamePageActions.playerSelecting(this.props.number);
    }

    render() {
        let color = 'game-setup-players-button';
        if (this.props.number < 2) {
            color += ' blue';
        } else if (this.props.number > 1) {
            color += ' red';
        }

        return (
            <button
              className={color}
              onClick={this.handleOpenModal}
            >
                <img src="http://placehold.it/92x92" alt="" />
            </button>
        );
    }
}

RemovePlayerButton.propTypes = {
    number: React.PropTypes.number
};

export default RemovePlayerButton;
