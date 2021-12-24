import React from 'react'

const Searchnav = ({setDisplaybar,setSearchvalue,searchvalue}) => {
    return (
        <div className="search-input d-flex align-items-center">
            <button className="d-xl-none d-inline-block-lg btn-barleft" onClick={() => setDisplaybar("hidden")}><i className="bi bi-list"></i></button>
            <label htmlFor="inpt_search"><i className="bi bi-search"></i></label>
            <input 
                type="search" 
                id="inpt_search" 
                placeholder="Search" 
                value={searchvalue} 
                onChange={(e) => setSearchvalue(e.target.value)} 
            />
        </div>
    )
}

export default Searchnav
