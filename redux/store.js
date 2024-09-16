import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/user/userSlice'

export default configureStore({
    reducer: {
        user: userReducer
    },
})