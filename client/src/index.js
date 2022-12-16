import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import SongPage from './pages/SongPage'

import ArtistDetailsPage from './pages/ArtistDetails';
import SongDetailsPage from './pages/SongDetails';

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
	<div>
		<Router>
			<Switch>
				<Route exact
					path="/"
					render={() => (
						<HomePage />
					)} />
				<Route exact
					path="/artists"
					render={() => (
						<ArtistPage />
					)} />
				<Route exact
					path="/songs"
					render={() => (
						<SongPage />
					)} />
				<Route exact
					path="/artistsDetail/:artist"
					render={() => (
						<ArtistDetailsPage />
					)} />
				<Route exact
					path="/songDetails/:artist/:song"
					render={() => (
						<SongDetailsPage />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);

