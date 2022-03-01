import React, { useState } from 'react';
import Picker from './picker';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setNewType } from '../../redux/reducers/appDataSlice';
import { displayBarLeft, setCompletedNotes } from '../../redux/reducers/componentsSlice';

const SectionLeft = ({handleFilterType, typeKey}) => {

    const initialType = {name: '', color: '#000', pickerState: false, inputState: false};
    const [typeForm, setTypeForm] = useState(initialType);
    
    const { displayBar } = useSelector(state => state.components);
    const { types } = useSelector(state => state.appData.body);
    const dispatch = useDispatch();

    const [btnFltdata, setBtnfltdata] = useState(false);

    const Handeltype = () => {
        dispatch(
            setNewType({name: typeForm.name, color: typeForm.color, id: uuidv4()})
        )
        setTypeForm(initialType)
    }

    return (
        <div className={`section-left col-xl-2 ${displayBar && 'hidden'}`}> 
            <i className="bi bi-x-lg d-xl-none" onClick={() => dispatch(displayBarLeft(false))}></i>
            <ul>
                <li onClick={() => dispatch(setCompletedNotes(false))}>
                    <button><i className="bi bi-pen"></i>Not Completed</button>
                </li>
                <li onClick={() => dispatch(setCompletedNotes(true))}>
                    <button><i className="bi bi-check2-circle"></i>Completed</button>
                </li>
                <li>
                    <button><i className="bi bi-alarm"></i>Filter by date</button>
                    {btnFltdata && 
                    <ul className="btns_flt_data">
                        <li><button>Oldest</button></li>
                        <li><button>Latest</button></li>
                    </ul>
                    }
                </li>
            </ul>
            <div className="types">
                <span className="line d-block"></span>
                {types.map(({name, color ,id}) => {
                    return (
                        <div key={id} 
                            className={`d-flex align-items-center note-type ${typeKey === name && 'focus'}`} 
                            onClick={() => handleFilterType(name)}
                        >
                            <span className="item" style={{ background: `${color}` }}></span>
                            <h4>{name}</h4>
                        </div>
                        )
                })}
                {typeForm.inputState && 
                    <div className="d-flex new-type">
                        <input type="text" placeholder="new type" 
                            value={typeForm.name}
                            onChange={(e) => setTypeForm({...typeForm, name: e.target.value})}
                        />
                        <button className="btn-color" onClick={() => setTypeForm({...typeForm, pickerState: !typeForm.pickerState})}></button>
                        <button className="btn-add" 
                            onClick={Handeltype}
                        >Add</button>
                        {typeForm.pickerState 
                            && <Picker 
                                    typeForm={typeForm} 
                                    setTypeForm={setTypeForm} 
                                />
                        }
                    </div>
                }
                <button className="btn-addtype" onClick={() => setTypeForm({...typeForm, inputState: true})}><span>+</span> Add new</button>
                <span className="line d-block"></span>
            </div>
        </div>
    )
}

export default SectionLeft
