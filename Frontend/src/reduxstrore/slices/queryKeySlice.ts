import { createSlice } from '@reduxjs/toolkit'

const initialState: { key: { name: string, sort: string } } = {
    key: {
        name: '',
        sort: ''
    }
}

const keySlice = createSlice({
    name: "key slice",
    initialState,
    reducers: {
        addKey: (state, action) => {
            state.key = action.payload
        },
        removeKey: (state, action) => {
            state.key = action.payload
        }
    }
})

export const { addKey, removeKey } = keySlice.actions
export default keySlice.reducer