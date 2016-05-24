import React from 'react';
import { connect } from 'alt-react';
import { Link } from 'react-router';
import AllRecentGames from 'AllRecentGames/AllRecentGames.jsx';
import GameHistoryStore from 'stores/GameHistoryStore.js';
import GameHistoryActions from 'actions/Game/GameHistoryActions.js';



class FeedPageBox extends React.Component {
    constructor() {
        super();
        this.state = { page: 1 };
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        GameHistoryActions.fetchRecentGamesData(this.state.page);
        document.getElementsByTagName('body')[0].className = 'page-landing';
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = '';
    }

    handleLoadMore() {
        let temp = this.state.page;
        temp++;
        this.setState({ page: temp });
        GameHistoryActions.fetchRecentGamesData(temp);
    }

    render() {
        return (
            <div>
                <header className="landing-header">
                    <div className="wrapper">
                        <Link to="/" className="header-logo" />
                        <nav>
                            <Link to="/" className="button borderless inline small">Home</Link>
                            <Link
                              to="/leaderboard"
                              className="button borderless inline small"
                            >           Leaderboard
                            </Link>
                        </nav>
                    </div>
                </header>
                <div className="feed wrapper">
                    <h1>Recent Games</h1>
                    <AllRecentGames recentGamesData={this.props.recentGamesData} />
                </div>
                <button className="button" onClick={this.handleLoadMore}> Load More </button>
            </div>
        );
    }
}

FeedPageBox.propTypes = {
    recentGamesData: React.PropTypes.array
};

FeedPageBox = connect(FeedPageBox, {
    listenTo() {
        return [GameHistoryStore];
    },
    getProps() {
        const state = GameHistoryStore.getState();
        return {
            recentGamesData: state.recentGamesData.slice(0, 25)
        };
    }
});


export default FeedPageBox;
