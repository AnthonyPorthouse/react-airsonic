import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";
import uuid from "uuid";
import md5 from "md5";

export const ping = createAsyncThunk("auth/ping", async (auth, thunkAPI) => {
  const response = await API.ping({ ...auth });
  return response.data;
});

const salt = uuid.v4();

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    salt,
    server: localStorage.getItem("auth.server") || "",
    username: localStorage.getItem("auth.username") || "",
    password: localStorage.getItem("auth.password") || "",
    token: md5(`${localStorage.getItem("auth.password")}${salt}`),
    success: false,
  },
  reducers: {
    setServer: (state, action) => {
      localStorage.setItem("auth.server", action.payload);
      state.server = action.payload;
    },
    setUsername: (state, action) => {
      localStorage.setItem("auth.username", action.payload);
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      localStorage.setItem("auth.password", action.payload);
      state.password = action.payload;
      state.token = md5(`${state.password}${state.salt}`);
    },
  },
  extraReducers: {
    [ping.fulfilled]: (state, action) => {
      state.success = true;
    },
  },
});

export const { setServer, setUsername, setPassword } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectServer = (state) => state.auth.server;
export const selectUsername = (state) => state.auth.username;
export const selectPassword = (state) => state.auth.password;
export const selectSuccess = (state) => state.auth.success;
export const selectAuth = (state) => ({
  server: state.auth.server,
  username: state.auth.username,
  token: state.auth.token,
  salt: state.auth.salt,
});

export default authSlice.reducer;
