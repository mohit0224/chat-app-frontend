import React from "react";

const SearchBox = () => {
	return (
		<div className="relative">
			<input
				type="search"
				name="search"
				id="search"
				placeholder="Search..."
				className="w-full border rounded-md py-2 px-3 outline-none"
			/>
		</div>
	);
};

export default SearchBox;
