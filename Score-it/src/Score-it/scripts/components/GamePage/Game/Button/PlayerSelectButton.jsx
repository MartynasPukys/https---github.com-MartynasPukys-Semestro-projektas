import React from 'react';
import GamePageActions from '../../../../shared_modules/actions/Game/GamePageActions.js';

class PlayerSelectButton extends React.Component {
    constructor() {
        super();
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal() {
        GamePageActions.openModal('select');
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
                <i className="icon-plus"></i>
            </button>
        );
    }
}

PlayerSelectButton.propTypes = {
    number: React.PropTypes.number
};

export default PlayerSelectButton;
