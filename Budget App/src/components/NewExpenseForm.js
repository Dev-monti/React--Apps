import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formModalsClose } from '../redux/slices/modalsStateSlice';
import { addExpense, addBudget } from '../redux/slices/addBudgetSlice';
import { v4 as uuidv4 } from 'uuid'

const NewExpenseForm = () => {

    const { budgets, forms } = useSelector(state => state);
    const options = budgets.map(bud => bud.name);

    const [selectValue, setSelectOption] = useState(forms.budgetValueAuto);
    const [description,setDescription] = useState('');
    const [amount,setAmount] = useState('');

    const dispatch = useDispatch();

    const fromClosed = () => {
        dispatch(formModalsClose({ name: "expenseForm" }))
    }

    const NewExpenseFormSubmit = (event) => {
        event.preventDefault();

        const budget = budgets.find(bud => bud.name === selectValue);
        const newExpenese = { name: description, amount: parseInt(amount), id: uuidv4() }

        if(budget !== undefined){
            dispatch(addExpense({...newExpenese, budgetId: budget.id}))
        }else{
            const createId = uuidv4();
            dispatch(addBudget({
                name: 'Uncategorized', 
                max: 0, 
                id: createId,
                expenses: [{ ...newExpenese, budgetId: createId, id: uuidv4() }],
            }))
        }
        setDescription('');
        setAmount(0);
    }

    return (
        <>
            <button className='overLay-btn' onClick={fromClosed}></button>
            <div className='col-xl-6 col-lg-6 col-md-8 form-body'>
                <div className='px-0 bg-white rounded'>
                    <div className='d-flex justify-content-between align-items-center border-bottom px-3 py-3 mb-1'>
                        <h3 className='m-0'>New Expense</h3>
                        <button type="button" className="btn-close"
                            onClick={(e) => fromClosed()}
                        ></button>
                    </div>
                    <form className='px-3'
                        onSubmit={NewExpenseFormSubmit}
                    >
                        <div className='py-3'>
                            <label htmlFor='description' className='mb-2'>Description</label>
                            <input id="description" type="text" 
                                required className='form-control' 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='py-3'>
                            <label htmlFor='Amount' className='mb-2'>Amount</label>
                            <input id="Amount" type="text" 
                                required className='form-control' 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className='py-3'>
                            <label className='mb-2'>Budget</label>
                            <select className="form-select"
                                onChange={(e) => setSelectOption(e.target.value)}
                            >
                                {[...new Set([forms.budgetValueAuto, ...options])].map((name,index) => <option key={index} value={name}>{name}</option>)}
                            </select>
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

export default NewExpenseForm
