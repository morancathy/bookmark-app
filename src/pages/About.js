import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About(props) {
	return (
		<div className="AboutPage">
			<h2>Sorry</h2>
			<p>That page not found</p>
			<Link to="/">Back to Home Page...</Link>
		</div>
	);
}
