import React from 'react';
import { useDispatch } from 'react-redux';
import { expensesFormOpen, expensesModalOpen } from '../redux/slices/modalsStateSlice';

const backgroundAmount = (min,max) => {
    if(min < (max / 2)){
        return
    }else{
        if(min < (max / (4 / 3))){
            return "bg-warning"
        }else{
            return "bg-danger"
        }
    }
}

export const BudgetCard = ({budget}) => {

    const dispatch = useDispatch();

    const amounts = budget.expenses.reduce((total,ex) => total + ex.amount,0)

    return (
        <div className='col-xl-4 col-lg-6'>
            <div className="border rounded p-3 mb-3">
                <div className='d-flex justify-content-between align-items-center pb-2'>
                    <h4 className='fs-5 fw-normal m-0'>{budget.name}</h4>
                    <div className='d-flex align-items-center'>
                        <h4 className='fs-5 fw-normal m-0'>US$ {amounts}</h4>
                        <span>/ US$ {budget.max}</span>
                    </div>
                </div>
                <div className="progress rounded-pill mt-2 mb-4">
                    <div className={`progress-bar ${backgroundAmount(amounts,budget.max)}`} role="progressbar" style={{width: `${amounts * 100 / budget.max}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className='d-flex'>
                    <button type="button" className="btn btn-outline-primary me-3"
                        onClick={() => dispatch(
                            expensesFormOpen({ option: budget.name })
                        )}
                    >Add Expense</button>
                    <button type="button" className="btn btn-outline-secondary"
                        onClick={() => dispatch(
                            expensesModalOpen({ budgetId: budget.id })
                        )}
                    >View Expenses</button>
                </div>
            </div>
        </div>
    );
};

export const TotalBudgetCard = ({budgets}) => {
    const total = budgets
    .map(bud => bud.max)
    .reduce((tot,max) => tot + max,0);

    const amounts = budgets
    .map(el => el.expenses.map(ex => ex.amount))
    .reduce((el,el1) => el + el1.reduce((it, it1) => it + it1, 0),0);

    return (
        total > 0 
        && <div className='col-xl-4 col-lg-6'>
                <div className="bg-light bg-gradient border rounded px-3 py-3">
                    <div className='d-flex justify-content-between align-items-center pb-2'>
                        <h4 className='fs-5 fw-normal m-0'>Total</h4>
                        <div className='d-flex align-items-center'>
                            <h4 className='fs-5 fw-normal m-0'>US$ {total} </h4>
                            <span>/ US$ {amounts}</span>
                        </div>
                    </div>
                    <div className="progress rounded-pill mt-2 mb-4">
                        <div className={`progress-bar ${backgroundAmount(amounts,total)}`} role="progressbar" style={{width: `${amounts * 100 / total}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
    )
} 

