import React from 'react';
import { connect } from 'alt-react';
import connectAuth from '../../connectAuth.js';

import AllRecentGames from 'AllRecentGames/AllRecentGames.jsx';
import TopPlayers from './TopPlayers/TopPlayers.jsx';
import PageTop from './LandingPage/PageTop.jsx';
import PageBottom from './LandingPage/PageBottom.jsx';
import PageTopLoggedIn from './LandingPage/PageTopLoggedIn.jsx';
import CurrentUser from 'CurrentUser/CurrentUser.jsx';

import GameHistoryStore from 'stores/GameHistoryStore.js';
import GameHistoryActions from 'actions/Game/GameHistoryActions.js';

import PlayersStore from 'stores/PlayersStore.js';
import PlayersActions from 'actions/Player/PlayersActions.js';

import LoginStore from 'stores/LoginStore.js';
import LoginActions from 'actions/Login/LoginActions.js';

class LandingPageBox extends React.Component {
    constructor() {
        super();
        this.state = { page: 0 };
    }

    componentWillMount() {
        GameHistoryActions.fetchRecentGamesData(this.state.page);
        LoginActions.fetchUser();
        PlayersActions.fetchPlayersData();
        document.getElementsByTagName('body')[0].className = 'page-landing';
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = '';
    }

    render() {
        return (
            <div>
                {this.props.isSignedIn &&
                    <PageTopLoggedIn>
                        <CurrentUser name={this.props.currentUserName} />
                        <TopPlayers topPlayersData={this.props.playersData} />
                    </PageTopLoggedIn>
                }
                {!this.props.isSignedIn &&
                    <PageTop>
                        <TopPlayers topPlayersData={this.props.playersData} />
                    </PageTop>
                }
                <PageBottom>
                    <AllRecentGames recentGamesData={this.props.recentGamesData} />
                </PageBottom>
            </div>
            );
    }
}

LandingPageBox = connectAuth(LandingPageBox);

LandingPageBox.propTypes = {
    recentGamesData: React.PropTypes.array,
    playersData: React.PropTypes.array,
    currentUserName: React.PropTypes.any,
    isSignedIn: React.PropTypes.bool
};

LandingPageBox = connect(LandingPageBox, {
    listenTo() {
        return [GameHistoryStore, PlayersStore, LoginStore];
    },
    getProps() {
        const state = GameHistoryStore.getState();
        const state2 = PlayersStore.getState();
        const state3 = LoginStore.getState();
        return {
            recentGamesData: state.recentGamesData,
            playersData: state2.playersData,
            currentUserName: state3.user.UserName
        };
    }
});

export default LandingPageBox;
