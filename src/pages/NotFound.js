import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props) {
	return (
		<div className="NotFoundPage">
			<h2>Sorry</h2>
			<p>Page not found</p>
			<Link to="/">Back to Home Page...</Link>
		</div>
	);
}
