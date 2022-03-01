import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppLog from './pages/AppLog';
import HelloApp from "./pages/HelloApp";

function App() {

  return (
    <div className="container-fluid">
        <Routes>
            <Route path="/" element={<HelloApp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<AppLog />} />
        </Routes>
    </div>
  );
}
export default App
