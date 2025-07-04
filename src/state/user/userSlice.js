import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
    isLoading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { update, setIsLoading } = userSlice.actions

export default userSlice.reducer