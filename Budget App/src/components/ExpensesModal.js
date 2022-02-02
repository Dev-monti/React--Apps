import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formModalsClose } from '../redux/slices/modalsStateSlice';
import { removeBudget, removeExpense } from '../redux/slices/addBudgetSlice';

const ExpensesModal = () => {

    const dispatch = useDispatch();
    const budgetId = useSelector(state => state.forms.budgetViewId);
    const { expenses, name } = useSelector(state => state.budgets.find(bud => bud.id === budgetId));

    const fromClosed = () => {
        dispatch(formModalsClose({ name: "expensesModal" }))
    }

    const budgetRemove = (id) => {
        dispatch(removeBudget({id: id}));
        fromClosed()
    }

    return(
        <>
            <button className='overLay-btn'
                onClick={fromClosed}
            ></button>
            <div className='col-xl-6 col-lg-6 col-md-8 form-body'>
                <div className='px-0 bg-white rounded'>
                    <div className='d-flex justify-content-between align-items-center border-bottom px-3 py-3 mb-1'>
                        <div className='d-flex'>
                            <h3 className='m-0'>Expenses - {name}</h3>
                            <button type="button" 
                                className="btn btn-outline-danger ms-3"
                                onClick={() => budgetRemove(budgetId)}
                            >Delete</button>
                        </div>
                        <button type="button" className="btn-close"
                            onClick={fromClosed}
                        ></button>
                    </div>
                    {expenses.map(({id, name, amount}) => {
                        return (
                            <div key={id} className='d-flex align-items-center justify-content-between px-3 py-2'>
                                <h4 className='fw-normal'>{name}</h4>
                                <div className='d-flex align-items-center'>
                                    <span className='fs-5'>US$ {amount}</span>
                                    <button className='btn btn-outline-danger ms-3'
                                        onClick={() => dispatch(removeExpense({budgetId: budgetId, id: id}))}
                                    >*</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default ExpensesModal;
