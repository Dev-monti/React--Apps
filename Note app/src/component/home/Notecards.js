import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormValues } from '../../redux/reducers/componentsSlice';
import { noteRemove, editNoteState } from '../../redux/reducers/appDataSlice';

const Notecards = ({notes, types}) => {

    const { notesCompleted } = useSelector(state => state.components);

    const [btnSetting, setBtnSetting] = useState(false);
    const [noteSetting, setNoteSetting] = useState();

    const dispatch = useDispatch();

    const handleBtnSetting = (index) => {
        setBtnSetting(!btnSetting);
        setNoteSetting(index)
    };

    const handleNoteComplated = (id, state) => {
        dispatch(editNoteState({id: id, state: !state}));
        setBtnSetting(false);
    };

    const handleRmoveNote = (id) => {
        dispatch(noteRemove(id));
        setBtnSetting(false);
    };

    const noteEdit = (data) => {
        dispatch(setFormValues({values: data}));
        setBtnSetting(!btnSetting)
    };

    return(
        <div className="container notes">
            <div className="row">
                {notes.map((note) => {
                    const { name, id, desc, date, type , completed } = note
                    const { color } = types.find(tp => tp.id === type.id)
                    return (
                        <div 
                            key={id} 
                            className={`col-xl-3 col-md-6 body-note ${
                                notesCompleted !== null && notesCompleted === !completed ? "none" : ""
                            }`}
                        >
                            <div className="note">
                                <div className={`head_note ${btnSetting && noteSetting === id && "setting_open"}`}>
                                    <span>{date.substr(0,10)}</span>
                                    <i className="bi bi-three-dots-vertical" onClick={() => handleBtnSetting(id)}></i>
                                    <ul>
                                        <li><button onClick={() => handleNoteComplated(id,completed)}>{completed ? "No completed" : "completed"}</button></li>
                                        <li><button onClick={() => noteEdit(note)}>edit</button></li>
                                        <li><button onClick={() => handleRmoveNote(id)}>remove</button></li>
                                    </ul>
                                </div>
                                <div className="title-note d-flex">
                                    <span style={{ backgroundColor: color !== undefined ? color : "#000" }}></span>
                                    <h3>{name}</h3>
                                </div>
                                <p>{desc.substr(0,100)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Notecards
