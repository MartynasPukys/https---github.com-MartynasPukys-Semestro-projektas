import React from 'react';
import { browserHistory } from 'react-router';
import LoginActions from 'actions/Login/LoginActions.js';
import ErrorsStore from 'stores/ErrorsStore.js';
import { connect } from 'alt-react';
import Header from './Header.jsx';

class LoginLayout extends React.Component {

    constructor() {
        super();
        this.state = { Email: '', Password: '', UserName: '', layout: 'SignIn',
         PasswordVerifier: '', error: '' };
        this.changeForm = this.changeForm.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePasswordVerifierChange = this.handlePasswordVerifierChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleMessageClose = this.onChange.bind(this);
    }

    componentDidMount() {
        document.getElementsByTagName('body')[0].className = 'page-landing';
        ErrorsStore.listen(this.onChange);
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = '';
        ErrorsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState({ error: state.error });
        if (this.state.error === 'success') {
            browserHistory.push('/');
        }
    }

    changeForm() {
        if (this.state.layout === 'SignIn') {
            this.setState({ layout: 'SignUp', error: '',
            Email: '', Password: '', PasswordVerifier: '' });
        } else {
            this.setState({ layout: 'SignIn', error: '',
            Email: '', Password: '', PasswordVerifier: '' });
        }
    }

    handleRegister(e) {
        e.preventDefault();

        if (this.state.Password !== this.state.PasswordVerifier) {
            this.setState({ error: 'Chosen passwords do not match.' });
        } else {
            LoginActions.register(this.state);
        }
    }

    handleLogin(e) {
        e.preventDefault();
        LoginActions.login(this.state);
    }

    handleEmailChange(e) {
        this.setState({ Email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ Password: e.target.value });
    }

    handleUserNameChange(e) {
        this.setState({ UserName: e.target.value });
    }

    handlePasswordVerifierChange(e) {
        this.setState({ PasswordVerifier: e.target.value });
    }

    render() {
        let errors;

        if (this.state.error && this.state.error.length && this.state.error !== 'success') {
            errors =
            (<div className="alert green">
                  {this.state.error}
            </div>);
        }
        if (this.state.layout === 'SignIn') {
            return (
                <div>
                    <Header />
                    <div className="login wrapper">
                        <div className="login-signin">
                            <form className="login-content" onSubmit={this.handleLogin}>
                                <h1>Score<strong>it</strong></h1>
                                        {errors}
                                <label className="label" htmlFor="">Email Address</label>
                                <input
                                  className="input" type="email" required
                                  value={this.state.Email}
                                  onChange={this.handleEmailChange}
                                />

                                <label className="label" htmlFor="">Password</label>
                                <input
                                  className="input" type="password" required
                                  value={this.state.Password}
                                  onChange={this.handlePasswordChange}
                                />

                                <button className="button" type="submit">
                                     Sign in
                                </button>
                                <a className="button link" href="#" onClick={this.changeForm}>
                                        Don`t have an account?
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Header />
                <div className="login wrapper">
                    <div className="login-create">
                        <form className="login-content" onSubmit={this.handleRegister}>
                            <h1>Score<strong>it</strong></h1>
                                        {errors}
                            <label className="label" htmlFor="">Email Address</label>
                            <input
                              className="input" type="email" required value={this.state.Email}
                              onChange={this.handleEmailChange}
                            />

                            <label className="label" htmlFor="">Username</label>
                            <input
                              className="input" type="text" required
                              value={this.state.UserName}
                              onChange={this.handleUserNameChange}
                            />

                            <label className="label" htmlFor="">Password</label>
                            <input
                              className="input" type="password" required
                              value={this.state.Password}
                              onChange={this.handlePasswordChange}
                            />

                            <label className="label" htmlFor="">Confirm Password</label>
                            <input
                              className="input" type="password" required
                              value={this.state.PasswordVerifier}
                              onChange={this.handlePasswordVerifierChange}
                            />

                            <button className="button" type="submit">
                                    Create and Sign in
                            </button>
                            <a className="button link" href="#" onClick={this.changeForm}>
                                    Sign in
                            </a>
                        </form>
                    </div>
                </div>
            </div>
            );
    }
}
LoginLayout.propTypes = {
    errorsData: React.PropTypes.string
};

LoginLayout = connect(LoginLayout, {
    listenTo() {
        return [ErrorsStore];
    },
    getProps() {
        const state = ErrorsStore.getState();
        return {
            errorsData: state.error
        };
    }
});

export default LoginLayout;
