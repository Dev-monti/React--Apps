import { createSlice } from "@reduxjs/toolkit";

const budgetsSlice = createSlice({
    name: "budgets",
    initialState: [],
    reducers: {
        addBudget: (state,{payload}) => {
            state.push({
                name: payload.name,
                max: parseInt(payload.max),
                id: payload.id,
                expenses: payload.expenses,
            })
        },
        removeBudget: (state,{payload}) => {
           return state.filter(bud => bud.id !== payload.id);
        },
        addExpense: (state,{payload}) => {
            const index = state.findIndex(item => item.id === payload.budgetId);
            state[index].expenses = [
                ...state[index].expenses, 
                {
                    name: payload.name, 
                    amount: payload.amount, 
                    budgetId: payload.budgetId,
                    id: payload.id
                }
            ]
        },
        removeExpense: (state,{payload}) => {
            const budgetIndex = state.findIndex(bud => bud.id === payload.budgetId);
            const newExpenses = state[budgetIndex].expenses.filter(ex => ex.id !== payload.id);
            const newBudget = {...state[budgetIndex] , expenses: newExpenses};
            return state.map(bud => {
                if(bud.id === payload.budgetId) return newBudget;
                return bud
            })
        },
    }
})

export default budgetsSlice.reducer

export const {
    addBudget, 
    removeBudget, 
    addExpense, 
    removeExpense
} = budgetsSlice.actions