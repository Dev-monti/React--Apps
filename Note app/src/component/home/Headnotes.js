import React, { useState } from 'react';
import { levels } from '../../constants';
import { useDispatch } from 'react-redux';
import {
    formStateChange, 
    setCompletedNotes
} from '../../redux/reducers/componentsSlice';

const Headnotes = ({handleFilterLevel, handleBtnAll}) => {

    const [numbutton,setNumbutton] = useState(-1);
    const dispatch = useDispatch();

    const levelClicked = (name,index) => {
        setNumbutton(index);
        handleFilterLevel(name);
    }

    const btnAllClicked = () => {
        setNumbutton(-1);
        handleBtnAll();
        dispatch(setCompletedNotes(null))
    }
    
    return (
        <div className="Headnotes d-flex justify-content-between align-items-center">
            <div className="levels">
                <button className={`${numbutton === -1 && "active"}`} onClick={btnAllClicked}>all</button>
                {levels.map((item,index) => <button key={index} 
                    className={`${numbutton === index && "active"}`}
                    onClick={() => levelClicked(item,index)}
                >{item}</button>)}
            </div>
            <button className='btn-new-note'
                onClick={() => dispatch(formStateChange({state: true}))}
            >
                <i className="bi bi-plus-circle"></i>
                Add new note
            </button>
        </div>
    )
}

export default Headnotes
