import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (auth, thunkAPI) => {
    return await API.getArtists(auth);
  }
);

export const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    artists: [],
    loaded: false,
  },
  reducers: {
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
  },
  extraReducers: {
    [getArtists.pending]: (state, action) => {
      state.loaded = true;
    },
    [getArtists.fulfilled]: (state, action) => {
      state.loaded = true;
      state.artists = action.payload;
    },
  },
});

export const { setArtists } = artistsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectArtists = (state) => state.artists.artists;
export const selectArtistsLoaded = (state) => state.artists.loaded;

export default artistsSlice.reducer;
