import alt from 'flux-context.js';
import axios from 'axios';
import ErrorsActions from 'actions/Errors/ErrorsActions.js';

class LoginActions {
    updateUser(user) {
        return user;
    }

    fetchUser() {
        return () => {
            return axios.post('/user/profile')
                .then((response) => {
                    this.updateUser(response.data);
                })
                .catch((response) => {
                    console.log(response);
                });
        };
    }

    register(registerModel) {
        return () => {
            axios.post('/user/register', registerModel)
            .then((response) => {
                ErrorsActions.handleErrors(response);
            })
                .catch((response) => {
                    ErrorsActions.handleErrors(response);
                });
        };
    }

    login(loginModel) {
        return () => {
            axios.post('/user/login', loginModel)
            .then((response) => {
                ErrorsActions.handleLoginErrors(response);
            })
                .catch((response) => {
                    ErrorsActions.handleLoginErrors(response);
                });
        };
    }

    logOff() {
        return () => {
            axios.post('/user/logoff')
                .then(() => {
                    location.href = '/';
                })
                .catch((response) => {
                    console.log(response);
                });
        };
    }
}

module.exports = alt.createActions(LoginActions);
