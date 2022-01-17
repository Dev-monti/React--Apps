import React from 'react'

import { GlobalContext } from './context';

const SearchInput = () => {

    const { state, handleSearch } = GlobalContext();

    return (
        <form onSubmit={e =>  e.preventDefault()}>
            <label htmlFor='search' className='d-block fs-2 fw-bold'>Search Hacker News</label>
            <input id="search" type="search" placeholder='Search...'
                className='my-4 p-2 text-secondary d-block border border-2'
                value={state.query}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </form>
    )
}

export default SearchInput
