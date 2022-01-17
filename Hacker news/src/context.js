import React,{ useReducer, useEffect, createContext, useContext } from "react";

const AppContext = createContext();

const API_URL = "https://hn.algolia.com/api/v1/search?";

const More_STRORIES = 'MORESTORIES';
const STORY_REMOVE = 'STORYREMOVE';
const SEARCH_QUERY = 'SEARCHQUERY';
const PLUS_PAGES = 'PLUSPAGES';
const RES_DATA = 'RESDATA';

const initialState = { loading: true, hits: [], page: 0, query: '' }

const AppProvider = (props) => {

    const reducer = (state,action) => {
        switch (action.type) {
            case RES_DATA:
                return {
                    ...state,
                    hits: action.payload.hits,
                    loading: action.payload.loading,
                    query: state.query,
                    page: state.page,
                }
            case STORY_REMOVE:
                return {
                    ...state,
                    hits: state.hits.filter(item => item.objectID !== action.payload)
                }
            case SEARCH_QUERY:
                return { ...state, query: action.payload, page: 0 }
            case PLUS_PAGES:
                return { 
                    ...state, 
                    page: state.page + action.payload
                }
            case More_STRORIES:
                return { ...state,  hits: [...state.hits, ...action.payload] }
            default:
        }
    }

    const [state,dispatch] = useReducer( reducer, initialState );

    const getResults = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data
    }

    const handleResults = async (url) => {
        const results = await getResults(url);
        dispatch({
            type: RES_DATA, payload: { hits: results.hits, loading: false }
        });
    }

    const storyRemove = (id) => {
        dispatch({ type: STORY_REMOVE, payload: id })
    }

    const handleSearch = (key) => {
        dispatch({ type: SEARCH_QUERY, payload: key })
    }

    const handleMoreStories = async () => {
        const results = await getResults(`${API_URL}query=${state.query}&page=${state.page + 1}`);
        dispatch({ type: More_STRORIES, payload: results.hits })
    }

    const windowScrolling = () => {
        const DOCUMENT = document.documentElement;
        if(
            DOCUMENT.scrollTop ===  DOCUMENT.scrollHeight - window.innerHeight
            && 
            state.page <= 50
        ){
            dispatch({ type: PLUS_PAGES, payload: 1 })
        }
    }

    useEffect(() => { 
        window.addEventListener('scroll',windowScrolling)
    }, [])

    useEffect(() => {
        if(state.page > 0){
            handleMoreStories()
        }
    },[state.page])

    useEffect(() => { 
        handleResults(`${API_URL}query=${state.query}`) 
    }, [state.query] )

    return(
        <AppContext.Provider value={{
            state, storyRemove, handleSearch
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export const GlobalContext = () =>  useContext(AppContext)

export { AppContext, AppProvider }