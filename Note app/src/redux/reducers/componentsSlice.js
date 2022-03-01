import { createSlice } from "@reduxjs/toolkit";
import { defaultValue } from '../../constants'

const componentsSlice = createSlice({
    name: "addForm",
    initialState: {
        displayBar: true,
        addFormState: false,
        notesCompleted: null,
        formValues: defaultValue,
    },
    reducers: {
        formStateChange: (state,{payload}) => {
            state.addFormState = payload.state
        },
        displayBarLeft: (state,{payload}) => {
            state.displayBar = payload
        },
        setCompletedNotes: (state,{payload}) => {
            state.notesCompleted = payload;
        },
        setFormValues: (state,{payload}) => {
            state.addFormState = true;
            state.formValues = payload.values
        }
    }
})

export const {
    formStateChange, 
    displayBarLeft, 
    setCompletedNotes, 
    setFormValues
} = componentsSlice.actions

export default componentsSlice.reducer