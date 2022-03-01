import { configureStore } from "@reduxjs/toolkit";
import componentsSlice from '../reducers/componentsSlice';
import appSlice from '../reducers/appDataSlice';

export const store = configureStore({
    reducer: {
        components: componentsSlice,
        appData: appSlice,
    }
})