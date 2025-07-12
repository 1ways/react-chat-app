import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
    isLoading: false,
    openedUser: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateChat: (state, action) => {
            state.value = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        updateOpenedUser: (state, action) => {
            state.openedUser = action.payload
        },
    }
})

export const { updateChat, setIsLoading, updateOpenedUser } = chatSlice.actions

export default chatSlice.reducer