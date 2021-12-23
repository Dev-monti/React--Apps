import React from 'react';  
import { ThemeColor } from '../App';

const Header = () => {
    return (
        <ThemeColor.Consumer>
            {({darkmode,setdarkmode}) => {
                return (
                    <header>
                        <div className="container">
                            <h2>devjobs</h2>
                            <div className="dark-mode">
                                <img src="../assets/desktop//icon-sun.svg" alt="..." />
                                <div className='btn-light-dark'
                                onClick={() => setdarkmode(!darkmode)}
                                >
                                    <span className={darkmode ? "dark" : ""}></span>
                                </div>
                                <img src="../assets/desktop/icon-moon.svg" alt="..." />
                            </div>
                        </div>
                    </header>
                )
            }}
        </ThemeColor.Consumer>
    )
}

export default Header
