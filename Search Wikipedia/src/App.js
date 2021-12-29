import React,{useState} from 'react';

const App = () => {

    const [searchkey,setSearchkey] = useState('');

    const [resLength,setReslength] = useState(null);

    const [results,setResults] = useState([]);
    const [data,setData] = useState([]);

    const [pushCount,setPushCount] = useState(4)

    const formSubmit = async (event) => {
        event.preventDefault();
        setPushCount(4)
        try{
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchkey}&gsrlimit=20&prop=pageimages|extracts&exintro&explaintext&exlimit=max&format=json&origin=*`);
            const dataRequest = await response.json();
            const responseData = Object.values(dataRequest.query.pages);

            setResults([responseData[0],responseData[1],responseData[2],responseData[3]]);

            setData(responseData);

            setReslength(responseData.length);

        }catch (err) {
            console.error(err);
            setReslength(0);
            setResults([]);
        }
    }

    const handleDataUi = () => {
        const newData = [...results];
        if(pushCount + 4 < resLength){
            for(let i = pushCount; i < pushCount + 4; i++){
                newData.push(data[i])
            }
            setPushCount(pushCount + 4)
        }else{
            for(let i = pushCount; i < resLength; i++){
                newData.push(data[i])
            }
            setPushCount(resLength)
        }
        setResults(newData)
    }

    return (
        <SearcheWikipediaStyle>
            <div className='container d-flex flex-column justify-content-between'>
                <main className='row justify-content-center'>
                    <h2 className='text-center pt-4'>
                        <span className='blue'>S</span>
                        <span className='red'>e</span>
                        <span className='yellow'>a</span>
                        <span className='blue'>r</span>
                        <span className='green'>c</span>
                        <span className='red'>h</span>
                        <span className='blue'>M</span>
                        <span className='yellow'>e</span>
                        <span className='red'>!</span>
                    </h2>
                    <form 
                        className='text-center col-xl-7 col-lg-9 d-flex align-items-center mt-3'
                        onSubmit={formSubmit}
                    >
                        <input type="text" className="border-0" 
                            value={searchkey} 
                            onChange={(e) => setSearchkey(e.target.value)} 
                        />
                        <button type='submit'><i className="bi bi-search"></i></button>
                    </form>
                    <section className="results col-xl-7 col-lg-9 mt-3 p-0">
                        {resLength !== null 
                        && (
                            resLength > 0 
                            ? <h4>Displaying {resLength} result.</h4> 
                            : <h4 className='text-danger'>Search is empty !</h4>
                        )
                        }
                        {results.map(item => (
                            <div key={item.pageid} className='result mb-3'>
                                <a href={`https://en.wikipedia.org/?curid=${item.pageid}`} rel='noopener noreferrer' target='_blank'>{item.title}</a>
                                <div className='d-flex'>
                                    {item.thumbnail && <img src={item.thumbnail.source} alt={item.title} style={{width: `${item.thumbnail.width}px`,height: `${item.thumbnail.height}px`,marginRight: "15px"}} />}
                                    <p>{item.extract.substring(0,103)}</p>
                                </div>
                            </div> 
                        ))}
                        {pushCount < resLength
                            && <button className="btn btn-outline-primary mx-auto my-5" onClick={handleDataUi}>Show more ...</button>
                        }
                    </section>
                </main>
                <footer>
                    <p className='text-center mb-2 mt-4'><span>&lt;&lt;</span> Powered by <a href="https://www.wikipedia.org" target="_blank" rel="noopener noreferrer">Wikipedia</a> <span>&gt;&gt;</span></p>
                </footer>
            </div>
        </SearcheWikipediaStyle>
    )
}

export default App
