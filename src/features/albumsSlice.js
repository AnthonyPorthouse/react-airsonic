import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";

export const getAllAlbums = createAsyncThunk(
  "albums/getAllAlbums",
  async (req, thunkAPI) => {
    return await API.getAllAlbums(req);
  }
);

export const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    loaded: false,
  },
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: {
    [getAllAlbums.pending]: (state, action) => {
      state.loaded = false;
      state.albums = [];
    },
    [getAllAlbums.fulfilled]: (state, action) => {
      state.loaded = true;
      state.albums = action.payload;
    },
  },
});

export const { setAlbums, setLoaded } = albumsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllAlbums = (state) => state.albums.albums;
export const selectAllAlbumsLoaded = (state) => state.albums.loaded;

export default albumsSlice.reducer;
