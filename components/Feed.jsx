"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();

		setAllPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, "i");
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.creator.tag) ||
				regex.test(item.creator.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchedResults = filterPrompts(e.target.value);
				setSearchedResults(searchedResults);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchedResults = filterPrompts(tagName);
		setSearchedResults(searchedResults);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for prompts..."
					value={searchText}
					className="search_input peer"
					onChange={handleSearchChange}
					required
				/>
			</form>

			{searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList
					data={allPosts}
					handleTagClick={handleTagClick}
				/>
			)}
		</section>
	);
};

export default Feed;
