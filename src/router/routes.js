import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

const routes = [
	{
		Component: Contact,
		key: 'Contact',
		path: '/contact'
	},
	{
		Component: Home,
		key: 'Home',
		path: '/'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: App,
		key: 'App',
		path: '/App'
	},
	{
		Component: NotFound,
		key: 'NotFound',
		path: '/notfound'
	}
];

export default routes;
