import React from 'react';

const SearchForm = ({ url, query, onUrlChange, onQueryChange, onFetchComments, onSearch }) => (
    <>
        <form onSubmit={onFetchComments}>
            <input
                type="text"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="Enter YouTube URL"
            />
            <button type="submit">Fetch Comments</button>
        </form>
        <form onSubmit={onSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Enter Comments search keyword"
            />
            <button type="submit">Search</button>
        </form>
    </>
);

export default SearchForm;
