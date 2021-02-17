import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "./api";

export const ping = createAsyncThunk(
    'auth/ping',
    async (auth, thunkAPI) => {
        const response = await API.ping(
            auth.server,
            auth.username,
            auth.password,
        )
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        server: localStorage.getItem('auth.server') || '',
        username: localStorage.getItem('auth.username') || '',
        password: localStorage.getItem('auth.password') || '',
        success: false,
    },
    reducers: {
        setServer: (state, action) => {
            localStorage.setItem('auth.server', action.payload);
            state.server = action.payload;
        },
        setUsername: (state, action) => {
            localStorage.setItem('auth.username', action.payload);
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            localStorage.setItem('auth.password', action.payload);
            state.password = action.payload;
        },
    },
    extraReducers: {
        [ping.fulfilled]: (state, action) => {
            state.success = true;
        }
    }
});

export const { setServer, setUsername, setPassword } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectServer = state => state.auth.server;
export const selectUsername = state => state.auth.username;
export const selectPassword = state => state.auth.password;
export const selectSuccess = state => state.auth.success;
export const selectAuth = state => ({
    server: state.auth.server,
    username: state.auth.username,
    password: state.auth.password,
});

export default authSlice.reducer;
