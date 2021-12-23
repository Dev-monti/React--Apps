import React,{useState,useEffect} from 'react';

const Country = ({setCountryui,data}) => {
    const [datacountry,setDatacountry] = useState(data)
    const 
    {name,nativeName,population,region,flags,subregion,capital,topLevelDomain,currencies,languages,borders} 
    = datacountry;
    const [newLanguages,setNewlanguages] = useState([]);
    const languagesData = () => {
        let Langg = []
        languages.forEach(item => {
            Langg.push(item.name)
        })
        setNewlanguages(Langg)
    }
    
    const searcheCountry = async (name) => {
        const data = await fetch(`https://restcountries.com/v2/alpha/${name}`);
        const newdata = await data.json();
        setDatacountry(newdata)
    }
    useEffect(() => {
        languagesData()
    },[])
    return (
        <div className="container cntr-county">
            <button className="btn-back" onClick={() => setCountryui(false)}>
                <i className="bi bi-arrow-left"></i>
                Back
            </button>
            <div className="row justify-content-between">
                <div className="col-xl-5 col-lg-6 col-md-8">
                    <img src={flags.svg} alt="..." />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-8 d-flex align-items-center">
                    <div className="info-cntr">
                        <h3>{name}</h3>
                        <div className="row">
                            <div className="col-xl-6 col-md-6">
                                <ul>
                                    <li>Native Name :<span> {nativeName}</span></li>
                                    <li>Populations :<span> {population}</span></li>
                                    <li>Region :<span> {region}</span></li>
                                    <li>Sub Region :<span> {subregion}</span></li>
                                    <li>capital :<span> {capital}</span></li>
                                </ul>
                            </div>
                            <div className="col-xl-6 col-md-6">
                                <ul>
                                    <li>Top Level Domain :<span> {topLevelDomain[0]}</span></li>
                                    <li>Currencies : <span>{currencies[0].code}</span></li>
                                    <li>languages : <span>{newLanguages.join()}</span></li>
                                </ul>
                            </div>
                        </div>
                        <h4>Border Countries : </h4>
                        {borders 
                        ? borders.map((item,index) => 
                            <button key={index} onClick={() => searcheCountry(item)}>{item}</button>) 
                        : <span> there are no borders</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country
