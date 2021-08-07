import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Show from '../pages/Show';
// import NotFound from '../pages/NotFound';

import routes from './routes';

const AppRouter = () => {
	return (
		<Router>
			<NavBar routes={routes} />
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						exact
						component={() => <Component page={key} />}
					></Route>
				))}
				<Route
					path={'/:id'}
					render={routerProps => <Show {...routerProps} />}
				></Route>
				<Route
					path={'/'}
					render={routerProps => <App {...routerProps} />}
				></Route>
				{/*<Route path="*">
					<NotFound />
				</Route>*/}
			</Switch>
		</Router>
	);
};
export default AppRouter;
