import React from 'react';
import { connect } from 'alt-react';
import { Link } from 'react-router';
import SearchInput from 'react-search-input';

import RankingsList from '../GamePage/Rankings/RankingsList/RankingsList.jsx';

import PlayersStore from 'stores/PlayersStore.js';
import PlayersActions from 'actions/Player/PlayersActions.js';

class RankingsBox extends React.Component {
    constructor() {
        super();
        this.state = { activeWins: 'active', activeLevel: '', search: '', order: 'wins', page: 1 };
        this.handleByLevel = this.handleByLevel.bind(this);
        this.handleByWins = this.handleByWins.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        PlayersActions.fetchRankingListDataSearch(this.state.search,
            this.state.order, this.state.page);
        document.getElementsByTagName('body')[0].className = 'page-landing';
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = '';
    }

    handleByLevel() {
        this.setState({ activeWins: '', activeLevel: 'active', order: 'level' });
        PlayersActions.fetchRankingListDataSearch(this.state.search, 'level', this.state.page);
    }

    handleByWins() {
        this.setState({ activeWins: 'active', activeLevel: '', order: 'wins' });
        PlayersActions.fetchRankingListDataSearch(this.state.search, 'wins', this.state.page);
    }

    handleSearch(term) {
        this.setState({ search: term, page: 1 });
        PlayersActions.fetchRankingListDataSearch(this.state.search,
            this.state.order, this.state.page);
    }

    handleLoadMore() {
        let temp = this.state.page;
        temp++;
        this.setState({ page: temp });
        PlayersActions.fetchRankingListDataSearch(this.state.search,
            this.state.order, temp);
    }

    render() {
        let buttonStyle = { marginTop: 20 };
        return (
            <div>
                <header className="landing-header">
                    <div className="wrapper">
                        <Link to="/" className="header-logo" />
                        <nav>
                            <Link to="/" className="button borderless inline small">Home</Link>
                            <Link to="/feed" className="button borderless inline small">Games</Link>
                        </nav>
                    </div>
                </header>
                <div className="feed wrapper">
                    <h1>Leaderboard</h1>
                    <SearchInput
                      className="search"
                      type="text" placeholder="Search by Name" value={this.state.search}
                      onChange={this.handleSearch} throttle={800}
                    />
                    <div className="page-rankings-sort">
                        <button
                          className={this.state.activeWins}
                          onClick={this.handleByWins}
                        >
                                    By Wins
                        </button>
                        <button
                          onClick={this.handleByLevel}
                          className={this.state.activeLevel}
                        >
                                    By Level
                        </button>
                    </div>
                    <div className="page-rankings">
                        <RankingsList playerData={this.props.playersData} />
                    </div>
                </div>
                <button
                  style={buttonStyle} className="button"
                  onClick={this.handleLoadMore}
                > Load More </button>
            </div>
        );
    }
}

RankingsBox.propTypes = {
    playersData: React.PropTypes.array
};

RankingsBox = connect(RankingsBox, {
    listenTo() {
        return [PlayersStore];
    },
    getProps() {
        const state = PlayersStore.getState();
        return {
            playersData: state.rankingsData
        };
    }
});

export default RankingsBox;
