import React from 'react';
import { useDispatch } from 'react-redux';
import { displayBarLeft } from '../../redux/reducers/componentsSlice';

const Searchnav = ({notesSearch}) => {
    const dispatch = useDispatch();
    return (
        <div className="search-input d-flex align-items-center">
            <button className="d-xl-none d-inline-block-lg btn-barleft" 
                onClick={() => dispatch(displayBarLeft(true))}
            >
                <i className="bi bi-list"></i>
            </button>
            <label htmlFor="inpt_search"><i className="bi bi-search"></i></label>
            <input 
                type="search" 
                id="inpt_search" 
                placeholder="Search"
                onChange={(e) => notesSearch(e.target.value)}
            />
        </div>
    )
}

export default Searchnav
