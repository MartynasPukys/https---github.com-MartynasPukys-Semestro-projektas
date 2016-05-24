import alt from 'flux-context.js';
import ErrorsActions from 'actions/Errors/ErrorsActions.js';

class ErrorsStore {
    constructor() {
        this.error = '';

        this.bindListeners({
            handleError: ErrorsActions.HANDLE_ERRORS,
            handleLoginErrors: ErrorsActions.HANDLE_LOGIN_ERRORS
        });
    }

    handleError(error) {
        if (error.data === '') {
            this.error = 'success';
        } else {
            this.error = error.data[0].Description;
        }
    }

    handleLoginErrors(error) {
        if (error.data === '') {
            this.error = 'success';
        } else {
            this.error = 'Wrong email, password or user with this email doesn\'t exist.';
        }
    }
}

module.exports = alt.createStore(ErrorsStore, 'ErrorsStore');
