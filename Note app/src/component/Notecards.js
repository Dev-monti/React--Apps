import React, {useState} from 'react'

const Notecards = ({
    Storage,
    notes,
    setNotes,
    btncomplated,
    setNewnote,
    setNotevalues,
    setNoteindex,
    searchvalue
}) => {
    const types = Storage("noteTypes");
    let notesnew = Storage("Notes");
    const [notesetting,setNotesetting] = useState();
    const settingKey = ['completed','edit','remove'];

    const openSetting = index => index === notesetting ? setNotesetting() : setNotesetting(index);

    const setnoteData = () => {
        setNotes(notesnew);
        localStorage.setItem('Notes',JSON.stringify(notesnew))
    }

    const noteCompleted = (index) => {
        notesnew[index]["finished"] = !notesnew[index]["finished"];
        setnoteData()
    }

    const noteEdit = (index) => {
        let noteData = notesnew[index];
        setNoteindex(index);
        setNotevalues(noteData);
        setNewnote(true);
    }

    const noteRemove = (index) => {
        notesnew.splice(index,1);
        setnoteData()
    }

    const noteEvent = (index,Function) => {
        openSetting(index)
        Function === "completed" && noteCompleted(index);
        Function === "remove" && noteRemove(index);
        Function === "edit" && noteEdit(index);
    }
    return(
        <div className="container notes">
            <div className="row">
                {notes.map((note,index) => {
                    const {title,desc,date,type,finished} = note;
                    let newColor;
                    types.forEach(el => {
                        if(el.type.toLowerCase() === type.toLowerCase()){
                            newColor = el.color
                        }})
                    return (
                        <div 
                            key={index} 
                            className={`col-xl-3 col-md-6 body-note ${
                                btncomplated === finished ? "d-inline-block" : "d-none"
                            } ${title.indexOf(searchvalue) < 0 ? "note_hidden" : ""}`}
                        >
                            <div className="note">
                                <div className={`head_note ${notesetting === index && "setting_open"}`}>
                                    <span>{date.substr(0,10)}</span>
                                    <i className="bi bi-three-dots-vertical" onClick={() => openSetting(index)}></i>
                                    <ul>
                                        {settingKey.map((item,ind) => 
                                            <li key={ind} onClick={() => noteEvent(index,item)}>
                                                <button>{`${finished && ind === 0 ? "No " : ""}` + item}</button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="title-note d-flex">
                                    <span style={{backgroundColor: newColor}}></span>
                                    <h3>{title}</h3>
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
