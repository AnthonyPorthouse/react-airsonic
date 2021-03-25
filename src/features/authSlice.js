import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";
import uuid from "uuid";
import md5 from "md5";
import { Cookies } from "react-cookie";

const salt = uuid.v4();
const cookies = new Cookies();

export const ping = createAsyncThunk("auth/ping", async (auth, thunkAPI) => {
  return await API.ping({ ...auth });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    salt,
    server: localStorage.getItem("ra.server") || "",
    username: localStorage.getItem("ra.username") || "",
    password: localStorage.getItem("ra.password") || "",
    token: md5(`${localStorage.getItem("ra.password")}${salt}`),
    success: false,
    error: "",
  },
  reducers: {
    setServer: (state, action) => {
      localStorage.setItem("ra.server", action.payload);
      state.server = action.payload;
    },
    setUsername: (state, action) => {
      localStorage.setItem("ra.username", action.payload);
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      localStorage.setItem("ra.password", action.payload);
      state.password = action.payload;
      state.token = md5(`${state.password}${state.salt}`);
    },
  },
  extraReducers: {
    [ping.fulfilled]: (state, action) => {
      state.success = action.payload;
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
