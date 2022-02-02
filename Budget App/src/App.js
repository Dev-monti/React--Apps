import React, {} from 'react';
import  './App.css';
import AllBudgetCard from './components/AllBudgetCard'
import FormsComponents from './components/FormsComponents';
import ButtonsAdd from './components/ButtonsAdd';
import { Provider } from 'react-redux'
import { store } from './redux/store'

const App = () => {
    return (
        <Provider store={store}>
            <div className='container'>
                <div className='d-flex justify-content-between py-5'>
                    <h2>Budgets</h2>
                    <ButtonsAdd />
                </div>
                <AllBudgetCard />
                <FormsComponents />
            </div>
        </Provider>
    )
}

export default App
