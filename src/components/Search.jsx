import React from "react";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        ref={searchInput}
      />
    </div>
  );
};

export default Search;