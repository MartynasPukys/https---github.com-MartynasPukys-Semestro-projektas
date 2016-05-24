import alt from 'flux-context.js';
import LoginActions from 'actions/Login/LoginActions.js';

class LoginStore {
    constructor() {
        this.state = {
            user: {}
        };

        this.bindListeners({
            handleUpdateUser: LoginActions.UPDATE_USER
        });
    }

    static isSignedIn() {
        const id = this.state.user.Id;
        return !!id;
    }

    handleUpdateUser(user) {
        this.setState({ user: user });
    }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');
