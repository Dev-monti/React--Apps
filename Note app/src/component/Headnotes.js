import React,{} from 'react'

const Headnotes = ({numbutton,setNumbutton,setNewnote,Restnotes,setNoteindex,setNotevalues}) => {
    const priority = ["low","meduim","high"];
    return (
        <div className="Headnotes d-flex justify-content-between align-items-center">
            <div className="priority">
                <button className={`${numbutton === -1 && "active"}`} onClick={() => {
                    Restnotes('state','all');
                    setNumbutton(-1)
                }}>all</button>
                {priority.map((item,index) => <button key={index} 
                    className={`${numbutton === index && "active"}`}
                    onClick={() => {
                        Restnotes("state",item.toLowerCase());
                        setNumbutton(index)
                    }}
                >{item}</button>)}
            </div>
            <span onClick={() => {
                setNewnote(true);
                setNoteindex("auto");
                setNotevalues({
                    title: "", 
                    desc: "", 
                    state: "priority", 
                    type: "type", 
                    date: (new Date()).toLocaleString("UK"), 
                    finished: false 
                  })
                }}>
                <i className="bi bi-plus-circle"></i>
                Add new note
            </span>
        </div>
    )
}

export default Headnotes
