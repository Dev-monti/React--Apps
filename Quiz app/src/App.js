import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BtnStart from './components/BtnStart';
import ModalRules from './components/ModalRules';
import Complated from './components/Complated';
import Quiz from './components/Quiz';
import './style.css'

const App = () => {
    const [points, setPoints] = useState(0)
    return (
        <BrowserRouter>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                <Routes>
                    <Route path='/' element={<BtnStart />} />
                    <Route path="/rules" element={<ModalRules />} />
                    <Route path='/quiz' element={<Quiz points={points} setPoints={setPoints} />} />
                    <Route path="/complate" element={<Complated points={points} setPoints={setPoints} />} />
                </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
