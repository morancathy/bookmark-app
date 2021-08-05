import React, { useState, useEffect } from 'react';

export default function Show(props) {
	const [bookmarks, setBookmarks] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmarks/${props.match.params.id}`);
				const data = await response.json();
				setBookmarks(data);
			} catch (error) {
				console.error(error);
			}
		})(); //what did this last () do?
	}, []);

	// const handleDelete = async id => {
	// 	try {
	// 		const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
	// 			method: 'DELETE',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		});
	// 		setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		window.location.assign('/');
	// 	}
	// };

	return (
		<div className="ShowPage">
			<h1>My Bookmarks</h1>
			<ul>
				{Object.keys(bookmarks).length ? (
					<li key={bookmarks._id}>
						<a className="link" href={bookmarks.link} target="_blank">
							{bookmarks.title}
						</a>
					</li>
				) : (
					<h1> Loading...</h1>
				)}
			</ul>
		</div>
	);
}

//<button onClick={() => handleDelete(bookmark._id)}>Delete</button>{' '}
