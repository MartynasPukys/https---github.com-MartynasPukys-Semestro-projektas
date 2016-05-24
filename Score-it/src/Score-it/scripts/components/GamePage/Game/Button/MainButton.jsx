import React from 'react';
import PlayerSelectButton from './PlayerSelectButton.jsx';
import RemovePlayerButton from './RemovePlayerButton.jsx';

class MainButton extends React.Component {
    render() {
        if (this.props.selected === true) {
            return (
                <RemovePlayerButton number={this.props.number} />
            );
        } else if (this.props.selected === false) {
            return (
                <PlayerSelectButton number={this.props.number} />
            );
        }
        return ('error');
    }
}

MainButton.propTypes = {
    selected: React.PropTypes.bool,
    number: React.PropTypes.number
};

export default MainButton;
