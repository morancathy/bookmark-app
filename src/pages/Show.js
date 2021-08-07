import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Show(props) {
	const [bookmarks, setBookmarks] = useState({});
	const linkInput = useRef(null);
	const titleInput = useRef(null);

	// const [bookmarks, setBookmarks] = React.useState({
	// 	title: '',
	// 	link: ''
	// });

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmarks/${props.match.params.id}`);
				if (!response.ok) {
					window.location.assign('/');
				}
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
					// title: title.current.value,
					// link: link.current.value
				})
			});
			const data = await response.json();
			setBookmarks(data);
		} catch (error) {
			console.error(error);
		}
		// 	finally {
		// 	window.location.assign('/home');
		// }
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
			{/*where is props and name 'app' coming from*/}
			{console.log(bookmarks.message)}
			{Object.keys(bookmarks).length ? (
				<>
					<h1>Edit Bookmark </h1>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<button onClick={() => handleDelete(bookmarks._id)}>Delete</button>
			{/*another way to write this to prevent loop?*/}
			{console.log(bookmarks)}
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
					<h4>{bookmarks.link}</h4>
				</label>
				<input className="update" type="submit" value="Update" />
			</form>
			<Link to={`/`}>
				<p>Back to Home Page</p>
			</Link>
		</div>
	);
}
//
//
// onChange={handleChange}
//<button onClick={() => handleDelete(bookmark._id)}>Delete</button>{' '}
