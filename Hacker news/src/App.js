import React from 'react';
import Stories from './Stories';
import SearchInput from './SearchInput';
import { AppProvider } from './context';

const App = () => {

    return (
        <div className='hero'>
            <AppProvider>
                <div className='container'>
                    <SearchInput />
                    <Stories />
                </div>
            </AppProvider>
        </div>
    )
}

export default App
