import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import artistReducer from '../features/artistSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        artists: artistReducer,
    },
});
