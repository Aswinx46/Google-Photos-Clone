import { createSlice } from '@reduxjs/toolkit'

const initialState: { token: string | null } = {
    token: null
}

const tokenSlice = createSlice({
    name: "Token Slice",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload
        },
        removeToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { addToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer