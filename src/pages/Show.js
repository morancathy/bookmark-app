import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [bookmarks, setBookmarks] = useState([]);
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
			window.location.assign('/home');
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

	return (
		<div className="ShowPage">
			This is the {props.page} page
			{Object.keys(bookmarks).length ? (
				<>
					<h1>{bookmarks.title} Bookmark </h1>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<button onClick={() => handleDelete(bookmark._id)}>Delete</button>
			{/*another way to write this to prevent loop?*/}
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleUpdate}
			>
				<label>
					Title:{'  '}
					<input type="text" ref={titleInput} defaultValue={bookmarks.title} />
				</label>
				<label>
					Link:{'  '}
					<textarea
						type="text"
						rows="1"
						cols="50"
						ref={linkInput}
						defaultValue={bookmarks.link}
					/>
				</label>
				<input type="submit" value="Update" />
			</form>
		</div>
	);
}

//<button onClick={() => handleDelete(bookmark._id)}>Delete</button>{' '}
