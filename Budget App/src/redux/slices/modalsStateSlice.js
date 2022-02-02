import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
    name: "modals",
    initialState: {
        budgetForm: false,
        expenseForm: false,
        expensesModal: false,
        budgetViewId: '',
        budgetValueAuto: 'Uncategorized',
    },
    reducers: {
        budgetFormOpen: (state) => {
            state.budgetForm = true
        },
        expensesFormOpen: (state,{payload}) => {
            state.expenseForm = true;
            state.budgetValueAuto = payload.option
        },
        expensesModalOpen: (state,{payload}) => {
            state.expensesModal = true;
            state.budgetViewId = payload.budgetId
        },
        formModalsClose: (state,{payload}) => {
            state[payload.name] = false
        }
    }
})

export default modalsSlice.reducer

export const { budgetFormOpen, expensesFormOpen, expensesModalOpen, formModalsClose } = modalsSlice.actions