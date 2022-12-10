import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';

import SearchSongPage from './pages/SearchSongPage';

import TopSongPage from './pages/TopSongPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import MatchesPage from './pages/MatchesPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/players"
							render={() => (
								<ArtistPage />
							)}/>
        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/>
        <Route exact
							path="/search_song"
							render={() => (
								<SearchSongPage />
							)}/>
        <Route exact
							path="/top_song"
							render={() => (
								<TopSongPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

