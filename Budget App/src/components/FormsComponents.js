import React from 'react';
import NewExpenseForm from './NewExpenseForm'
import ExpensesModal from './ExpensesModal';
import NewBudgetForm from './NewBudgetForm';
import { useSelector } from 'react-redux';

const FormsComponents = () => {

    const { budgetForm, expenseForm, expensesModal } = useSelector(state => state.forms)

    return (
        <div className="row justify-content-center forms-container">
            {expenseForm && <NewExpenseForm />}
            {budgetForm && <NewBudgetForm /> }
            {expensesModal && <ExpensesModal /> }
        </div>
    );
};

export default FormsComponents;
