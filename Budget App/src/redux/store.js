



import { configureStore } from '@reduxjs/toolkit';
import budgetsSlice from './slices/addBudgetSlice';
import modalsSlice from './slices/modalsStateSlice';

export const store = configureStore({
    reducer: {
        budgets: budgetsSlice,
        forms: modalsSlice,
    },
})