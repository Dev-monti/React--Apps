import React, {} from 'react'

const Countries = ({datacountry,searchvalue,setCountryui,setDatacountry}) => {
    return (
        <div className="row Countries">
            {datacountry.map(item => {
                const {capital,flags,name,population,region} = item;
                return(
                    <div key={name} 
                        className={
                            `col-xl-3 col-lg-4 col-md-6 
                            ${searchvalue && (name.trim().toLowerCase().indexOf(searchvalue) >= 0? "d-flex" : "d-none")}`
                        }
                        onClick={() => {
                            setDatacountry(item)
                            setCountryui(true)
                        }}
                    >
                        <div className="country">
                            <img src={flags.svg} alt="..." />
                            <div className="country-info">
                                <h3>{name}</h3>
                                <ul>
                                    <li>Populations :<span> {population}</span></li>
                                    <li>Region :<span> {region}</span></li>
                                    <li>Capital :<span> {capital}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Countries
