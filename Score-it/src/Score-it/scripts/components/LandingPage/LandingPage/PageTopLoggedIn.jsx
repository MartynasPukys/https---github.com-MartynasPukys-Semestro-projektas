import React from 'react';
import { Link } from 'react-router';

class PageTopLoggedIn extends React.Component {
    render() {
        return (
            <div className="hero-bg">
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
                           {this.props.children[0]}
                        </nav>
                    </div>
                </header>
                <div className="landing-content">
                    <h1>Score  your  winnings
                        <small>You play foosball table, we track your results.</small>
                    </h1>
                    <Link to="/game" className="button large blue">Start your game</Link>
                    <section>
                        <h1>Top players</h1>
                        <div id="wrapper profile-data-wrapper">
                            {this.props.children[1]}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

PageTopLoggedIn.propTypes = {
    children: React.PropTypes.array.isRequired
};

export default PageTopLoggedIn;
