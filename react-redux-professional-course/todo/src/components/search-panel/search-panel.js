import React from 'react'

import './search-panel.css'

const SearchPanel = ({ getSearchItem }) => {

    const handlerChange = (e) => getSearchItem(e.target.value)

    return (
        <>
            <input
                placeholder='search'
                onChange={handlerChange}
            />
        </>
    )
}

export default SearchPanel