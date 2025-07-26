import type { UserType } from '@/types/user/userType'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { user: UserType | null } = {
    user: null
}

const userSlice = createSlice({
    name: "User slice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer