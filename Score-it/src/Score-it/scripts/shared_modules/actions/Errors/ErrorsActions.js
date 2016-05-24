import alt from 'flux-context.js';

class ErrorsActions {

    handleErrors(error) {
        return function(dispatch) {
            dispatch(error);
        };
    }

    handleLoginErrors(error) {
        return function(dispatch) {
            dispatch(error);
        };
    }
}

module.exports = alt.createActions(ErrorsActions);
