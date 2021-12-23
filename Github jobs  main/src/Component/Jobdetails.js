import React from 'react'
import { useEffect } from 'react/cjs/react.development'
import Header from './Header'

const Jobdetails = ({jbdetails}) => {
    const 
    {company,logo,logoBackground,position,postedAt,contract,location,website,apply,description,requirements,role} 
    = jbdetails

    useEffect(() => window.scrollTo(0,0),[])
    return (
        <>
            <Header />
            <div className="container Jobdetails">
                <div className="row">
                    <div className="col-xl-8 col-lg-10 col-md-10 header-dt-jb">
                        <div className="company-logo" style={{backgroundColor: logoBackground}}>
                            <img src={logo} alt="..." />
                        </div>
                        <div className="info-cmpny">
                            <h3>{company}</h3>
                            <a target='_blank' href={website}>{website}</a>
                        </div>
                        <button>Company<span></span>Site</button>
                    </div>
                    <div className="col-xl-8 col-lg-10 col-md-10 desc-job">
                        <div className="hd-ds-jb">
                            <div className="hddsjb-left">
                                <p>{postedAt}<span>.</span>{contract}</p>
                                <h3>{position}</h3>
                                <h5>{location}</h5>
                            </div>
                            <a href={apply} target="_blank">Apply Now</a>
                        </div>
                        <div>
                            <p className="desc-dt">{description}</p>
                        </div>
                        <h3>Requirements</h3>
                        <div>
                            <p className="desc-dt">{requirements.content}</p>
                            <ul>{requirements.items.map((item,index) => <li key={index}>{item}</li>)}</ul>
                        </div>
                        <h3>What You Will Do</h3>
                        <div>
                            <p className="desc-dt">{role.content}</p>
                            <ol>{role.items.map((item,index) => <li key={index}>{item}</li>)}</ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Jobdetails
