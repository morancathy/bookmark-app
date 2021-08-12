import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { isWebUri } from 'valid-url';

export default function Show(props) {
	const [bookmarks, setBookmarks] = useState({});
	const linkInput = useRef(null);
	const titleInput = useRef(null);

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

	const handleDelete = async id => {
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};
	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: titleInput.current.value,
					link: linkInput.current.value
				})
			});
			const data = await response.json();
			setBookmarks(data);
		} catch (error) {
			console.error(error);
		}
	};

	function handleChange(evt) {
		const value = evt.target.value;
		setBookmarks({
			...bookmarks,
			[evt.target.name]: value
		});
	}

	return (
		<div className="ShowPage">
			{Object.keys(bookmarks).length ? (
				<>
					<h1>Edit Bookmark </h1>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<button onClick={() => handleDelete(bookmarks._id)}>Delete</button>
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleUpdate}
			>
				<label>
					<h4 className="label">Title: </h4>
					<input
						type="text"
						name="title"
						defaultValue={bookmarks.title}
						ref={titleInput}
					/>
					<h4>{bookmarks.title}</h4>
				</label>

				<label>
					<h4 className="label">Link: </h4>
					<input
						type="text"
						name="link"
						defaultValue={bookmarks.link}
						ref={linkInput}
					/>
					<textarea value={bookmarks.link}></textarea>
				</label>
				<input className="update" type="submit" value="Update" />
			</form>
			<Link to={`/`}>
				<p>Back to Home Page</p>
			</Link>
		</div>
	);
}
