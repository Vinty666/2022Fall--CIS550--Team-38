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
import ArtistDetailsPage from './pages/ArtistDetails';
import SongDetailsPage from './pages/SongDetails';
import ArtistPage from './pages/ArtistPage';
import SongPage from './pages/SongPage'

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
							path="/artists"
							render={() => (
								<ArtistPage />
							)}/>
        <Route exact
							path="/songs"
							render={() => (
								<SongPage />
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
		<Route exact 
							path="/artist_details"
							render={() => (
								<ArtistDetailsPage />
							)}/>
		<Route exact 
							path="/song_details"
							render={() => (
								<SongDetailsPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

