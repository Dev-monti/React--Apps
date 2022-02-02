import React, {} from 'react';
import { useSelector } from 'react-redux';
import { BudgetCard, TotalBudgetCard } from './BudgetCard';

const AllBudgetCard = () => {
    
    const budgets = useSelector(state => state.budgets);

    return (
        <div className='row'>
            {budgets.map(bud => <BudgetCard key={bud.id} budget={bud} /> )}
            <TotalBudgetCard budgets={budgets} />
        </div>
    )
} 

export default AllBudgetCard