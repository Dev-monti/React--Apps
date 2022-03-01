import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { levels, defaultValue } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setNote, noteEdit } from '../../redux/reducers/appDataSlice';
import { formStateChange } from '../../redux/reducers/componentsSlice';

const Addnote = () => {

    const defaultValues = useSelector(state => state.components.formValues);
    const { types } = useSelector(state => state.appData.body);
    const dispatch = useDispatch();

    const [hiddenLevele,setHiddenLevels] = useState(false);
    const [hiddenTypes,setHiddenTypes] = useState(false);
    const [value,setValue] = useState(defaultValues);
    const [submited,setSubmited] = useState(false);

    const handleNewNote = () => {
        setSubmited(true)
        if(
            value.name 
            && value.level !== 'level' 
            && value.type.name !== 'type'
        ){
            if(!value.id){
                dispatch(
                    setNote({...value, id: uuidv4(), date: new Date().toLocaleString("UK")})
                );
            }else{
                dispatch(
                    noteEdit(value)
                );
            }
            setSubmited(false)
            setValue(defaultValue);
        }
    }

    const handleLevel = (item) => {
        setValue({...value, level: item});
        setHiddenLevels(false)
    }

    const handleType = (name, id) => {
        setValue({...value, type: {name: name, id: id}});
        setHiddenTypes(false)
    }

    const addNewClose = () => {
        dispatch(formStateChange({state: false}))
    }

    return (
        <div className="container-addnote">
            <div className="new-note">
                <input type="text" placeholder="Name" 
                    value={value.name} 
                    onChange={(e) => setValue({...value, name: e.target.value})} 
                />
                {submited && !value.name ? <span>input is field</span> : null}
                <textarea type="text" placeholder="Description (Optional)" rows="6" /> 
                <div className="d-flex justify-content-between btns-lists">
                    <div className={`${submited && value.level === "level" ? "empty" : ""}`}>
                        <button 
                            onClick={() => setHiddenLevels(!hiddenLevele)}>
                            {value.level}
                            <i className={`bi bi-caret-${hiddenLevele? "up" : "down"}-fill`}></i>
                        </button>
                        {hiddenLevele && 
                        <ul>
                            {levels.map((item,index) => <li key={index} 
                            onClick={() => handleLevel(item)}>{item}</li>)}
                        </ul>}
                    </div>
                    <div className={`type-list ${submited && value.type === "type"? "empty" : ""}`}>
                        <button 
                            onClick={() => setHiddenTypes(!hiddenTypes)}>
                            {value.type.name}
                            <i className={`bi bi-caret-${hiddenTypes? "up" : "down"}-fill`}></i>
                        </button>
                        {hiddenTypes && 
                        <ul>
                            {types.map(({name, id}) => <li key={id} 
                            onClick={() => handleType(name, id)}>{name}</li>)}
                        </ul>}
                    </div>
                </div>
                <div className="btns-footer-form d-flex justify-content-around">
                    <button onClick={addNewClose}>CANCEL</button>
                    <button onClick={handleNewNote}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Addnote
