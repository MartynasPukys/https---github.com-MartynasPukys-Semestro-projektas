import React from 'react';
import { connect } from 'alt-react';
import { Link } from 'react-router';

import LoginStore from 'stores/LoginStore.js';
import LoginActions from 'actions/Login/LoginActions.js';
import Navigation from './Navigation.jsx';
import CurrentUser from 'CurrentUser/CurrentUser.jsx';

class GamePageBox extends React.Component {

    componentWillMount() {
        LoginActions.fetchUser();
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="wrapper wide">
                        <Link to="/" className="header-logo" />
                        <CurrentUser name={this.props.currentUserName} />
                    </div>
                </div>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
}

GamePageBox.propTypes = {
    children: React.PropTypes.element,
    currentUserName: React.PropTypes.string
};

GamePageBox = connect(GamePageBox, {
    listenTo() {
        return [LoginStore];
    },
    getProps() {
        const state = LoginStore.getState();
        return {
            currentUserName: state.user.UserName
        };
    }
});


export default GamePageBox;
