import React from 'react'

const Search = ({ search, searchInput, handleSearch }) => {

    return (
        <div>
            <input ref={searchInput} type="text" value={search} onChange={handleSearch} />
        </div>
    )
}

export default Search
