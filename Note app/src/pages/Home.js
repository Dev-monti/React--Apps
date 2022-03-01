import React, { useState, useEffect } from 'react';
import { getUserNotes } from '../redux/reducers/appDataSlice';
import { useSelector, useDispatch } from "react-redux";
import SectionLeft from '../component/home/SectionLeft';
import Searchnav from "../component/home/Searchnav";
import Headnotes from "../component/home/Headnotes";
import Notecards from "../component/home/Notecards";
import Addnote from "../component/home/Addnote";
import HelloApp from './HelloApp';

const Home = () => {

    const { addFormState } = useSelector(state => state.components);
    const { userLogin, responsiveData, body } = useSelector(state => state.appData);
    const dispatch = useDispatch()

    const [notes, setNotes] = useState([])
    const [typeKey, setTypeKey] = useState(null);
    const [levelKey, setLevelKey] = useState(null);

    const handleFilterLevel = (levelname) => {
        setLevelKey(levelname);
        const newNotes = body.notes.filter(
            item => (
                ! typeKey 
                ? (item.level === levelname)
                : (item.level === levelname && item.type.name === typeKey) 
            )
        );
        setNotes(newNotes)
    }

    const handleFilterType = (typename) => {
        setTypeKey(typename);
        const newNotes = body.notes.filter(
            item => (
                ! levelKey 
                ? (item.type.name === typename)
                : (item.type.name === typename && item.level === levelKey) 
            )
        );
        setNotes(newNotes)
    }

    const handleBtnAll = () => {
        setTypeKey(null);
        setLevelKey(null);
        setNotes(body.notes)
    }

    const notesSearch = (key) => {
        const newNotes = body.notes.filter(
            note => (
                note.name.indexOf(key) > -1
                && (typeKey ? note.type.name === typeKey : true)
                && (levelKey ? note.level === levelKey : true)
            )
        );
        setNotes(newNotes)
    }

    useEffect(() => {
        setNotes(body.notes);
    }, [body])
    
    useEffect(() => {
        dispatch(getUserNotes())
    }, [])

    return (
        userLogin
        ?
        <div className="row">
            <SectionLeft 
                handleFilterType={handleFilterType}
                typeKey={typeKey}
            />
            <div className="col-xl-10 col-12 p-0 body-app">
                <Searchnav notesSearch={notesSearch} />
                <Headnotes 
                    handleFilterLevel={handleFilterLevel}
                    handleBtnAll={handleBtnAll}
                />
                <>
                    {responsiveData
                        ?   <Notecards
                                types={body.types}
                                notes={notes}
                            />
                        :   <div className='spinner'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }
                </>
            </div>
            {addFormState && <Addnote />}
        </div>
        : <HelloApp />
    );
}

export default Home