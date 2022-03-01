import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { arrayUnion, deleteField, doc, getDoc, updateDoc } from "firebase/firestore";

// handle all notes
export const getUserNotes = createAsyncThunk(
    'appState/getNotes',
    async (_,{ getState }) => {
        return (
            await getDoc(
                doc(db, 'usersdatanotes', getState().appData.userInfo.id)
            )
        ).data();
    }
)

export const setNote = createAsyncThunk(
    'appState/setnote',
    async (newNote, {getState}) => {
        await updateDoc(doc(db, 'usersdatanotes', getState().appData.userInfo.id), {
            [`notes.${newNote.id}`]: newNote
        })
        return newNote
    }
)

export const setNewType = createAsyncThunk(
    'appstate/settype',
    async (newType, { getState }) => {
        await updateDoc(doc(db, 'usersdatanotes', getState().appData.userInfo.id), {
            types: arrayUnion(newType)
        })
        return newType
    }
)

// handle note
export const noteRemove = createAsyncThunk(
    "appState/removenote",
    async (noteId,{getState}) => {
        const {body, userInfo} = getState().appData;
        // const newNote = body.notes.find(nt => nt.id === noteId);
        const newNotes = body.notes.filter(note => note.id !== noteId);
        await updateDoc(doc(db, 'usersdatanotes', userInfo.id),{
            [`notes.${noteId}`]: deleteField()
        })        
        return newNotes
    }
);

export const editNoteState = createAsyncThunk(
    'appState/noteState',
    async ({ id, state }, { getState }) => {
        const { body, userInfo } = getState().appData;
        const notes = body.notes.map(note => (
            note.id !== id ? note : {...note, completed: state}
        ))
        await updateDoc(
            doc(db, "usersdatanotes", userInfo.id),{
                [`notes.${id}.completed`]: state
            }
        )
        return notes

    } 
);

export const noteEdit = createAsyncThunk(
    'appState/noteedit',
    async (data,{ getState }) => {
        const { body, userInfo } = getState().appData;
        const notes = body.notes.map(note => (note.id === data.id ? data : note))
        await updateDoc(
            doc(db, "usersdatanotes", userInfo.id),{
                [`notes.${data.id}`]: data
            }
        )
        return notes
    }
);

const appSlice = createSlice({
    name: "appState",
    initialState: {
        body: {notes: [], types: []}
    },
    reducers:{
        userLoginState: (state, {payload}) => {
            state.userLogin = true;
            state.responsiveData = true;
            state.userInfo = {email: payload.email, id: payload.id};
        }
    },
    extraReducers: {
        [getUserNotes.pending]: (state) => {
            state.responsiveData = false
        },
        [getUserNotes.fulfilled]: (state, {payload}) => {
            state.responsiveData = true
            state.body = {
                notes: Object.values(payload.notes), 
                types: payload.types
            }
        },
        [setNote.fulfilled]: (state, {payload}) => {
            state.body.notes.push(payload)
        },
        [setNewType.fulfilled]: (state, {payload}) => {
            state.body.types.push(payload)
        },
        [noteRemove.fulfilled]: (state, {payload}) => {
            state.body.notes = payload
        },
        [editNoteState.fulfilled]: (state, {payload}) => {
            state.body.notes = payload
        },
        [noteEdit.fulfilled]: (state,{payload}) => {
            state.body.notes = payload
        }
    }
})

export const { userLoginState, thisStateChange } = appSlice.actions

export default appSlice.reducer