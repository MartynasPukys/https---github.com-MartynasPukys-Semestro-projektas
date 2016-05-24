import { connect } from 'alt-react';
import LoginStore from 'stores/LoginStore.js';

function connectAuth(component, options) {
    return connect(component, {
        listenTo() {
            const stores = [LoginStore];

            if (options) {
                const temp = options.listenTo();

                for (const store of temp) {
                    if (store !== LoginStore) {
                        stores.push(store);
                    }
                }
            }

            return stores;
        },

        getProps() {
            let props = {};
            if (options) {
                props = options.getProps();
            }

            const state = LoginStore.getState();

            return Object.assign({}, props, {
                isSignedIn: LoginStore.isSignedIn(),
                id: state.user.Id,
                userName: state.user.UserName
            });
        }
    });
}

export default connectAuth;
