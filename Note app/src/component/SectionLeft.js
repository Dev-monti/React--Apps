import React, {useState} from 'react'
import Picker from '../picker';

const SectionLeft = ({
    displaybar,
    setDisplaybar,
    Storage,
    Restnotes,
    btncomplated,
    setBtncomplated
}) => {
    const [showpicker,setShowpicker] = useState(false);
    const [formtype,setFormtype] = useState(false);
    const [inputtype,setInputtype] = useState("");
    const [typecolor,setTypecolor] = useState("#000");
    const [btnFltdata,setBtnfltdata] = useState(false);
    // Set local storage note types
    const noteTypes = [
        {type: "projects",color: "yellow"},
        {type: "business", color: "orangered"},
        {type: "personal",color: "rgb(0, 132, 255)"}
    ]
    !localStorage.getItem("noteTypes") && localStorage.setItem("noteTypes",JSON.stringify(noteTypes));
    // Creating new type
    const types = Storage("noteTypes");
    const Handeltype = () => {
        setShowpicker(false);
        setFormtype(false);
        inputtype && 
        types.push({type:inputtype,color:typecolor});
        localStorage.setItem('noteTypes',JSON.stringify(types));
        setInputtype("")
    }
    // btns complated and no
    const BtnFin = (Statebtn) => Statebtn ? setBtncomplated(true) : setBtncomplated(false);

    return (
        <div className={`section-left col-xl-2 ${displaybar}`}> 
            <i className="bi bi-x-lg d-xl-none" onClick={() => setDisplaybar("")}></i>
            <ul>
                <li className={`${!btncomplated && "clicked"}`} onClick={() => BtnFin(false)}>
                    <i className="bi bi-pen"></i>
                    <button>Not Completed</button>
                </li>
                <li className={`${btncomplated && "clicked"}`} onClick={() => BtnFin(true)}>
                    <i className="bi bi-check2-circle"></i>
                    <button>Completed</button>
                </li>
                <li onClick={() => setBtnfltdata(!btnFltdata)}>
                    <i className="bi bi-alarm"></i>
                    <button>Filter by date</button>
                    {btnFltdata 
                    && <ul className="btns_flt_data">
                            <li><button>Oldest</button></li>
                            <li><button>Latest</button></li>
                        </ul>
                    }
                </li>
            </ul>
            <div className="types">
                <span className="line d-block"></span>
                {types.map((item,index) => {
                    return (
                        <div key={index} 
                            className="d-flex align-items-center note-type" 
                            onClick={() => Restnotes("type",item.type)}
                        >
                            <span className={`item`} style={{background: `${item.color}`}}></span>
                            <h4>{item.type}</h4>
                        </div>
                        )
                })}
                {formtype && 
                    <div className="d-flex new-type">
                        <input type="text" placeholder="new type" 
                            value={inputtype}
                            onChange={(e) => setInputtype(e.target.value.trim())}
                        />
                        <button className="btn-color" onClick={() => setShowpicker(!showpicker)}></button>
                        <button className="btn-add" 
                            onClick={Handeltype}>Add</button>
                        {showpicker && <Picker typecolor={typecolor} setTypecolor={setTypecolor} />}
                    </div>
                }
                <button className="btn-addtype" onClick={() => setFormtype(true)}><span>+</span> Add new</button>
                <span className="line d-block"></span>
            </div>
        </div>
    )
}

export default SectionLeft
