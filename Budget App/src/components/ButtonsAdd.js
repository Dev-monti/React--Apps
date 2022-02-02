import React from 'react';
import { useDispatch } from 'react-redux';
import { expensesFormOpen, budgetFormOpen } from '../redux/slices/modalsStateSlice'

const ButtonsAdd = () => {
    const dispatch = useDispatch();
    return (
        <div className='d-flex'>
        <button type="button" className="btn btn-primary mx-3"
            onClick={() => dispatch(budgetFormOpen())}
        >Add Budget</button>
        <button type="button" className="btn btn-outline-primary"
            onClick={() => dispatch(expensesFormOpen({ 
                option: "Uncategorized" 
            }))}
        >Add Expense</button>
    </div>
    );
};

export default ButtonsAdd;
