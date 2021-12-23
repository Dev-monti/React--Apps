import React, { useEffect, useState } from 'react'
import Header from './Header';
import Filtering from './Filtering';
import {Link} from "react-router-dom"

const Jobs = ({data,viewJob}) => {
    const [defaultdata,setDefaultdata] = useState([])
    const [alldata,setAlldata] = useState([]);
    const [fulltime,setFulltime] = useState(false);

    const filterItem = (title,location) => {
        let newData = [];
        defaultdata.forEach(item => {
            let titleStata = item["position"].toLowerCase().indexOf(title.toLowerCase().trim()) > -1;
            let locationState = item["location"].toLowerCase().indexOf(location.toLowerCase().trim()) > -1;
            if(titleStata && locationState){
                newData.push(item)
            }
        })
        setAlldata(newData);
    }

    useEffect(() => {
        setDefaultdata(data);
        setAlldata(data)
    },[data])
    
    return (
        <>
            <Header />
            <Filtering 
                filterItem={filterItem}
                setFulltime={setFulltime}
                fulltime={fulltime}
            />
            <div className="container jobs_UI">
                {alldata.map(item => {
                    return (
                    fulltime
                    ? (item.contract === "Full Time" && handleJobUI(item,viewJob))
                    : handleJobUI(item,viewJob)
                    )
                })}
            </div>
        </>
    )
}

export default Jobs;

const handleJobUI = (info,viewJob) => {
    const {id,company,logo,logoBackground,position,postedAt,contract,location} = info
    return (
        <div className="job-Singal" key={id}>
            <div className="cmpny-logo"
                style={{backgroundColor: logoBackground}}
            >
            <img src={`.${logo}`} alt="..." />
            </div>
            <p>{postedAt}<span>.</span>{contract}</p>
            <Link 
                to="/job_details"
            >
                <h3 onClick={() => viewJob(id)} >{position}</h3>
            </Link>
            <p>{company}</p>
            <h5>{location}</h5>
        </div> 
    )
}
