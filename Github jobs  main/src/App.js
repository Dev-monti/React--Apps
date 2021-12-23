import React,{useEffect,useState,createContext} from "react";
import './Style/index.css';
import Jobs from './Component/Jobs';
import {BrowserRouter  as Router,Switch,Route} from 'react-router-dom'
import Jobdetails from "./Component/Jobdetails";


export const ThemeColor = createContext();

function App() {
  const [darkmode,setdarkmode] = useState(false);
  const [datadefault,setDatadefault] = useState([]);
  const [jbdetails,setJbdetails] = useState();

  const getDataJobs = async () => {
    const info = await fetch('data.json');
    const data = await info.json();
    setDatadefault(data);
  }

  const viewJob = (id) => {
    let item_target = datadefault.filter(item => item.id === id);
    setJbdetails(...item_target);
  }

  useEffect(() => { getDataJobs() },[])
  return (
    <Router>   
         <div className={`hero ${darkmode && "dark"}`}> 
           <ThemeColor.Provider value={{darkmode,setdarkmode}}>
              <Switch>
                <Route exact path="/" 
                  render={() => 
                    <Jobs data={datadefault} viewJob={viewJob}
                    /> }
                /> 
                <Route path="/job_details" 
                  render={() => <Jobdetails jbdetails={jbdetails} />}
                />
              </Switch>
           </ThemeColor.Provider>
         </div>
    </Router>
  );
}

export default App;
