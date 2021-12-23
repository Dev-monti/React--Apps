import React, { useState, useEffect } from "react";
import Countries from './component/Countries';
import Country from "./component/Country";

const Regions = ['Africa','Americas','Asia','Europe','Oceania'];

function App() {
  const [datacountries,setDatacountries] = useState([])
  const [regionui,setRegionui] = useState(false);
  const [inputsrch,setInputsrch] = useState('');
  const [searchvalue,setSearchvalue] = useState();
  const [countryui,setCountryui] = useState(false);
  const [datacountry,setDatacountry] = useState();
  const [drakclass,setDarkclass] = useState(false)

  const getData = async (region) => {
    const data = await fetch(`https://restcountries.com/v2/${region}`);
    const newdata = await data.json();
    setDatacountries(newdata);
  } 

  const searchCountry = (name) => {
    setInputsrch(name)
    setSearchvalue(name)
  }

  useEffect(() => {
    getData("all");
  },[])
  return (
    <div className={`hero ${drakclass && "dark"}`}>
      <header>
        <div className="container d-flex justify-content-between align-items-center">
          <h2>Where in the world?</h2>
          <button className="btn-dark-mode"
            onClick={() => setDarkclass(!drakclass)}
          >
            <i className="bi bi-moon"></i>
            <span>Dark Mode</span>
          </button>
        </div>
      </header>
      {!countryui 
      ? <div className="container">
        <div className="row justify-content-between filtering">
          <div className="col-xl-4 col-md-6 body-search">
            <div className="search">
              <i className="bi bi-search"></i>
              <input type="search" placeholder="Search a country..." 
                value={inputsrch} onChange={(e) => searchCountry(e.target.value.trim().toLowerCase())} 
              />
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-7 body-filter">
            <div className="filter" onClick={() => setRegionui(!regionui)}>
              <span>Filter by Region</span>
              {regionui? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
              {regionui &&
              <ul>
                {Regions.map((item,index) => <li key={index} onClick={() => getData(`continent/${item}`)}>{item}</li>)}
              </ul> 
              }
            </div>
          </div>
        </div>
        {datacountries.length !== 0
        ? <Countries 
            datacountry={datacountries} 
            searchvalue={searchvalue} 
            setCountryui={setCountryui} 
            setDatacountry={setDatacountry}
          /> 
        : <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      </div>
      : <Country setCountryui={setCountryui} data={datacountry} />}
    </div>
  );
}

export default App;
