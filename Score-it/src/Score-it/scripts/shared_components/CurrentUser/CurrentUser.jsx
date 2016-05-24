import React from 'react';
import LoginActions from 'actions/Login/LoginActions.js';

class CurrentUser extends React.Component {
    constructor() {
        super();
        this.handleOnLogout = this.handleOnLogout.bind(this);
    }

    handleOnLogout() {
        LoginActions.logOff();
    }

    render() {
        return (
            <div className="header-user">
                Welcome {this.props.name},
                <a href="#" onClick={this.handleOnLogout}> logout <i className="icon-logout" /></a>
            </div>
        );
    }
}

CurrentUser.propTypes = {
    name: React.PropTypes.string.isRequired
};


export default CurrentUser;
