import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import LandingPageBox from './components/LandingPage/LandingPageBox.jsx';
import LoginLayout from './components/LoginPage/LoginLayout.jsx';
import GamePageBox from './components/GamePage/GamePageBox.jsx';
import ProfileBox from './components/GamePage/Profile/ProfileBox.jsx';
import RankingsBox from './components/GamePage/Rankings/RankingsBox.jsx';
import GameScreenNavigation from './components/GamePage/Game/GameScreenNavigation.jsx';

import FeedPageBox from './components/FeedPage/FeedPageBox.jsx';
import LeaderboardBox from './components/LeaderboardPage/LeaderboardBox.jsx';

import LoginStore from 'stores/LoginStore.js';
import LoginActions from 'actions/Login/LoginActions.js';

function requireAuth(nextState, replace) {
    if (!LoginStore.isSignedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function loadeProfile(nextState, replace, goToNextState) {
    LoginActions.fetchUser().then(goToNextState);
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={LandingPageBox} onEnter={loadeProfile} />
        <Route path="/feed" component={FeedPageBox} />
        <Route path="/login" component={LoginLayout} />
        <Route path="/leaderboard" component={LeaderboardBox} />
        <Route component={GamePageBox}>
            <Route path="/rankings" component={RankingsBox} onEnter={requireAuth} />
            <Route path="/profile" component={ProfileBox} onEnter={requireAuth} />
            <Route path="/game" component={GameScreenNavigation} onEnter={requireAuth} />
        </Route>
    </Router>
), document.getElementById('app'));

