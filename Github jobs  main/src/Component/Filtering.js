import React,{useState} from 'react'



const Filtering = ({filterItem,setFulltime,fulltime}) => {
    const [checked,setChecked] = useState(false);
    const [filtersm,setFiltersm] = useState(false);
    const [inputtitle,setInputtitle] = useState('');
    const [inputlcation,setInputlcation] = useState('')

    const filtertitel = (title) => {
        setInputtitle(title);
        filterItem(title,inputlcation)
    }

    const filterlocation = (location) => {
        setInputlcation(location);
        filterItem(inputtitle,location)
    }

    const Clickcheckdd = () => {
        setChecked(!checked);
        setFulltime(!fulltime)
    }
    return (
        <>
            {filtersm && <div className="overlay" onClick={() => setFiltersm(!filtersm)}></div>}
            <div className="container filtering">
                <div className="row form-filter">
                        <div className="col-md-4 input-filter">
                            <img src="../assets/desktop/icon-search-purple.svg" alt="..." />
                            <input type="text" placeholder="Filter by title..."
                                value={inputtitle}
                                onChange={(e) => filtertitel(e.target.value)}
                            />
                            <img 
                                src="../assets/mobile/icon-filter.svg" 
                                className="iconFilter" alt="..." 
                                onClick={() => setFiltersm(!filtersm)}
                            />
                        </div>
                        <div className={`row col-xl-8 col-md-8 If-right ${filtersm && "hide"}`}>
                            <div className="col-md-6 input-filter">
                                <img src="../assets/desktop/icon-location.svg" alt="..." />
                                <input type="text" placeholder="Filter by location..." 
                                    value={inputlcation}
                                    onChange={(e) => filterlocation(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 input-filter">
                                <div 
                                    className={`checkbox ${checked && "checked"}`}
                                    onClick={Clickcheckdd}
                                ></div>
                                <p>Full Time</p>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Filtering
