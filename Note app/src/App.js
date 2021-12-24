import React, {useState} from "react";
import SectionLeft from "./component/SectionLeft";
import Searchnav from "./component/Searchnav";
import Headnotes from "./component/Headnotes";
import Notecards from "./component/Notecards";
import Addnote from "./component/Addnote";

function App() {

  const Storage = (Store) => {
    if(localStorage.getItem(`${Store}`)){
      Store = JSON.parse(localStorage.getItem(`${Store}`));
    }else{
      Store = []
    }
    return Store;
  }

  const [displaybar,setDisplaybar] = useState("");
  
  const storagenotes = Storage("Notes");
  const [notes,setNotes] = useState(storagenotes);
  const [notefilter,setNotefilter] = useState(storagenotes);

  const [searchvalue,setSearchvalue] = useState('');

  const [btncomplated,setBtncomplated] = useState(false);

  const [noteindex,setNoteindex] = useState("auto");
  const [notevalue,setNotevalues] = useState({
    title: "", 
    desc: "", 
    state: "priority", 
    type: "type", 
    date: (new Date()).toLocaleString("UK"), 
    finished: false 
  })

  const [newnote,setNewnote] = useState(false);
  const [numbutton,setNumbutton] = useState(-1);
  const Restnotes = (category,ctgry_value) => {
      let newnotes = storagenotes;
      if(category === "state"){
        if(ctgry_value !== "all"){
          newnotes = storagenotes.filter(item => item["state"].toLowerCase() === ctgry_value);
        }
        setNotes(newnotes);
        setNotefilter(newnotes)
      }
      if(category !== "state"){
        setNotes(notefilter.filter(item => item[category] === ctgry_value.toLowerCase()))
      }
  }

  return (
    <div className="container-fluid">
      <div className="row">
          <SectionLeft 
            displaybar={displaybar}  
            setDisplaybar={setDisplaybar} 
            Storage={Storage} 
            Restnotes={Restnotes} 
            notes={notes}
            setNotes={setNotes}
            setNumbutton={setNumbutton}
            btncomplated={btncomplated}
            setBtncomplated={setBtncomplated}
          />
          <div className="content-body col-xl-10 col-12">
              <Searchnav 
                setDisplaybar={setDisplaybar} 
                setSearchvalue={setSearchvalue} 
                searchvalue={searchvalue}
              />
              <Headnotes 
                numbutton={numbutton} 
                setNumbutton={setNumbutton} 
                setNewnote={setNewnote} 
                Restnotes={Restnotes} 
                setNoteindex={setNoteindex}
                setNotevalues={setNotevalues}
              />
              <Notecards 
                notes={notes} 
                setNotes={setNotes} 
                Storage={Storage} 
                btncomplated={btncomplated} 
                setNewnote={setNewnote}
                setNotevalues={setNotevalues}
                setNoteindex={setNoteindex}
                searchvalue={searchvalue}
              />
          </div>
          {newnote 
          && 
          <Addnote 
            Storage={Storage} 
            setNumbutton={setNumbutton} 
            setNotes={setNotes} 
            setNewnote={setNewnote} 
            notevalue={notevalue}
            noteindex={noteindex}
          />}
      </div>
    </div>
  );
}

export default App;
