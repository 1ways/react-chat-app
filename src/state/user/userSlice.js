import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
    isLoading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.value = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { updateUser, setIsLoading } = userSlice.actions

export default userSlice.reducer