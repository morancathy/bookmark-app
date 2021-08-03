import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [bookmarks, setBookmarks] = useState([]);
	const [newBookmark, setNewBookmark] = useState({
		title: '',
		link: ''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/bookmarks');
				const data = await response.json();
				setBookmarks(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		})(); //what did this last () do?
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' //headers?
				},
				body: JSON.stringify(newBookmark) //so turning into string just to turn back again?
			});
			const data = await response.json();
			setBookmarks([...bookmarks, data]); //this means adding 'data' to end of bookmark array?
			setNewBookmark({
				title: '',
				link: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		//why is this not async but handleSubmit is
		setNewBookmark({ ...newBookmark, [e.target.id]: e.target.value });
	}; //still not to sure what e.target.id and e.target.value actually does

	return (
		<div className="AppPage">
			This is the {props.page} page
			<h1>My Bookmarks</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="title"
					value={newBookmark.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="link"
					value={newBookmark.link}
					onChange={handleChange}
				/>
				<input type="submit" value="Submit" />
			</form>
			<ul>
				{bookmarks.map(bookmark => {
					return (
						<li key={bookmark._id}>
							<a className="link" href={bookmark.link}>
								{bookmark.title}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
