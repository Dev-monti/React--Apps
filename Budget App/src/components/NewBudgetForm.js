import React,{ useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addBudget } from '../redux/slices/addBudgetSlice';
import { formModalsClose } from '../redux/slices/modalsStateSlice';

const NewBudgetForm = () => {
    
    const [budgetName, setBudgetName] = useState('');
    const [budgetMax, setBudgetMax] = useState(0);  

    const dispatch = useDispatch()

    const AddNewBudget = (event) => {
        event.preventDefault();

        dispatch(addBudget({
            name: budgetName, 
            max: budgetMax, 
            id: uuidv4(),
            expenses: [],
        }))

        setBudgetName('');
        setBudgetMax(0)
    }

    const fromClosed = () => {
        dispatch(formModalsClose({ name: "budgetForm" }))
    }

    return (
        <>
            <button className='overLay-btn' onClick={fromClosed}></button>
            <div className='col-xl-6 col-lg-6 col-md-8 form-body'>
                <div className='px-0 bg-white rounded'>
                    <div className='d-flex justify-content-between align-items-center border-bottom px-3 py-3 mb-1'>
                        <h3 className='m-0'>New Budget</h3>
                        <button type="button" className="btn-close"
                            onClick={(e) => fromClosed()}
                        ></button>
                    </div>
                    <form className='px-3' onSubmit={AddNewBudget}>
                        <div className='py-3'>
                            <label htmlFor='name' className='mb-2'>Name</label>
                            <input id="name" type="text" 
                                className='form-control' 
                                required
                                value={budgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                            />
                        </div>
                        <div className='py-3'>
                            <label htmlFor='maximum_Spending' className='mb-2'>Maximum Spending</label>
                            <input id="maximum_Spending" type="number" 
                                className='form-control'
                                required 
                                value={budgetMax}
                                onChange={(e) => setBudgetMax(e.target.value)}
                            />
                        </div>
                        <div className='d-flex justify-content-end pb-3'>
                            <button type='submit' className='btn btn-primary'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewBudgetForm
