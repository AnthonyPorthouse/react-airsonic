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
    server: cookies.get("ra.server"),
    username: cookies.get("ra.username"),
    password: cookies.get("ra.password"),
    token: md5(`${cookies.get("ra.password")}${salt}`),
    success: false,
  },
  reducers: {
    setServer: (state, action) => {
      cookies.set("ra.server", action.payload, { sameSite: true });
      state.server = action.payload;
    },
    setUsername: (state, action) => {
      cookies.set("ra.username", action.payload, { sameSite: true });
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      cookies.set("ra.password", action.payload, { sameSite: true });
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
