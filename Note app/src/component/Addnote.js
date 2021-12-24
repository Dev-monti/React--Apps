import React, {useState} from 'react'

const Addnote = ({setNumbutton,Storage,notevalue,setNotes,setNewnote,noteindex}) => {
    const newTypes = Storage("noteTypes");
    const priority = ["Low","Meduim","High"];
    // Hidden lists
    const [hiddenpriority,setHiddenpriority] = useState(false);
    const [hiddentypes,setHiddentypes] = useState(false);
    const [value,setValue] = useState(notevalue);
    const [submited,setSubmited] = useState(false);
    // Functions 
    const Clickoption = (el,option) => {
        setValue({...value, [el]: option});
        el === "state"? setHiddenpriority(!hiddenpriority) : setHiddentypes(!hiddentypes);
    }
    const SubmitOk = () => {
        setSubmited(true);
        if(value.title && value.state !== "priority" && value.type !== "type"){
            let Notes = Storage("Notes");
            if(noteindex === "auto"){
                setNotes([...Notes,value]);
                Notes.push(value);
            }else{
                Notes.splice(noteindex,1,value)
                setNotes(Notes)
                setNewnote(false)
            }
            localStorage.setItem("Notes",JSON.stringify(Notes));
            setNumbutton(-1);
            setValue(notevalue);
            setSubmited(false);
        }
    }
    return (
        <div className="container-addnote">
            <div className="new-note">
                <input type="text" placeholder="Name" value={value.title} onChange={(e) => setValue({...value,title: e.target.value})} />
                {submited && !value.title? <span>input is field</span> : null}
                <textarea type="text" placeholder="Description (Optional)" rows="6" value={value.desc} onChange={(e) => setValue({...value,desc: e.target.value})} /> 
                <div className="d-flex justify-content-between btns-lists">
                    <div className={`Priority-list ${submited && value.state === "priority"? "empty" : ""}`}>
                        <button 
                            onClick={() => setHiddenpriority(!hiddenpriority)}>
                            {value.state}
                            <i className={`bi bi-caret-${hiddenpriority? "up" : "down"}-fill`}></i>
                        </button>
                        {hiddenpriority && 
                        <ul>
                            {priority.map((item,index) => <li key={index} 
                            onClick={() => {Clickoption("state",item);}}>{item}</li>)}
                        </ul>}
                    </div>
                    <div className={`type-list ${submited && value.type === "type"? "empty" : ""}`}>
                        <button 
                            onClick={() => setHiddentypes(!hiddentypes)}>
                            {value.type}
                            <i className={`bi bi-caret-${hiddentypes? "up" : "down"}-fill`}></i>
                        </button>
                        {hiddentypes && 
                        <ul>
                            {newTypes.map((item,index) => <li key={index} 
                            onClick={() => {Clickoption("type",item.type.toLowerCase());}}>{item.type}</li>)}
                        </ul>}
                    </div>
                </div>
                <div className="btns-footer-form d-flex justify-content-around">
                    <button onClick={() => setNewnote(false)}>CANCEL</button>
                    <button onClick={SubmitOk}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Addnote
