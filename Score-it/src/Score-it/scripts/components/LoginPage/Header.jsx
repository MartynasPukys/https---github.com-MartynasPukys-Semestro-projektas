import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {
        return (
            <header className="landing-header">
                <div className="wrapper">
                    <Link to="/" className="header-logo" />
                    <nav>
                        <Link
                          to="/leaderboard"
                          className="button borderless inline small"
                        >
                                Leaderboard
                        </Link>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
