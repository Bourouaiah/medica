import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    password: "",
    name: "",
    profilePicture: "",
    dateOfBirth: null,
    email: "",
    phoneNumber: null,
    gender: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentUserData: (state, action) => {
            const { email, password } = action.payload;
            state.email = email;
            state.password = password;
        }
    },
})

export const { getCurrentUserData } = userSlice.actions

export default userSlice.reducer