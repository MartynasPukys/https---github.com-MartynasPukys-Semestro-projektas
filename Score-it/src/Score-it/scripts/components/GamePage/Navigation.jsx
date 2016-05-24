import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {

    render() {
        return (<nav className="navigation">
            <div className="wrapper">
                <Link to="/game" className="navigation-item" activeClassName="active">
                    <i className="icon-game"></i>
                    Game
                </Link>
                <Link to="/rankings" className="navigation-item" activeClassName="active">
                    <i className="icon-rankings"></i>
                    Rankings
                </Link>
                <Link to="/profile" className="navigation-item" activeClassName="active">
                    <i className="icon-profile"></i>
                    Profile
                </Link >
            </div>
        </nav>);
    }
}

export default Navigation;
