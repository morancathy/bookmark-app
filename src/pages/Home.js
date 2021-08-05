import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export default function Home(props) {
	const [bookmarks, setBookmarks] = useState([]);
	const [newBookmark, setNewBookmark] = useState({
		title: '',
		link: ''
	});
	const bodyInput = useRef(null);
	const titleInput = useRef(null);

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

	const handleDelete = async id => {
		try {
			const response = await fetch(`/api/bookmarks/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
		} catch (error) {
			console.error(error);
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
					body: bodyInput.current.value
				})
			});
			const data = await response.json();
			setBookmarks(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="HomePage">
			This is the {props.page} page
			{/*where is props and name 'app' coming from*/}
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
				<input type="submit" value="Add New Website" />
			</form>
			<ul>
				{bookmarks.map(bookmark => {
					return (
						<li className="list-item" key={bookmark._id}>
							<a className="link" href={bookmark.link} target="_blank">
								{bookmark.title}
							</a>

							{/*another way to write this to prevent loop?*/}
							<button onClick={() => handleDelete(bookmark._id)}>Delete</button>

							<form onSubmit={handleUpdate}>
								<label>
									Title:
									<input
										type="text"
										ref={titleInput}
										defaultValue={bookmark.title}
									/>
								</label>
								<label>
									Body:
									<input
										type="text"
										ref={bodyInput}
										defaultValue={bookmark.body}
									/>
								</label>
								<input type="submit" value="Update" />
							</form>
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

//

// <h3>
// 	<FaTimes
// 		style={{ color: 'red', cursor: 'pointer' }}
// 		onClick={() => handleDelete(bookmark._id)}
// 	/>
// </h3>
