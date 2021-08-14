import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { isWebUri } from 'valid-url';

export default function Home(props) {
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
			} catch (error) {
				console.error(error);
			}
		})(); //what did this last () do?
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!newBookmark.title || !newBookmark.link) {
			alert('Please add website title and link');
			return;
		}

		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBookmark)
			});
			const data = await response.json();
			setBookmarks([...bookmarks, data]);
			setNewBookmark({
				title: '',
				link: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setNewBookmark({ ...newBookmark, [e.target.id]: e.target.value });
	};

	return (
		<div className="HomePage">
			<h1>My Bookmarks</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="title"
					placeholder="website title"
					onChange={handleChange}
				/>
				<input
					type="text"
					id="link"
					placeholder="link"
					onChange={handleChange}
				/>
				<input className="add" type="submit" value="Add" />
			</form>
			<ul>
				{bookmarks.map(bookmark => {
					return (
						<li className="list-item" key={bookmark._id}>
							{!isWebUri(bookmark.link) ? (
								<Link to={'/notfound'}>{bookmark.title}</Link>
							) : (
								<a className="link" href={bookmark.link} target="_blank">
									{bookmark.title}
								</a>
							)}
							<Link to={`/${bookmark._id}`}>
								<button>Update</button>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
