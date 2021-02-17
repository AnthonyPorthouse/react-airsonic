import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";

export const getAlbum = createAsyncThunk(
  "album/getAlbum",
  async (req, thunkAPI) => {
    return await API.getAlbum(req.id, req.server, req.username, req.password);
  }
);

export const albumSlice = createSlice({
  name: "album",
  initialState: {
    album: {},
    tracks: [],
    loaded: false,
  },
  reducers: {
    setAlbum: (state, action) => {
      state.artist = action.payload;
    },
    setTracks: (state, action) => {
      state.albums = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: {
    [getAlbum.pending]: (state, action) => {
      state.loaded = false;
      state.album = {};
      state.tracks = [];
    },
    [getAlbum.fulfilled]: (state, action) => {
      state.loaded = true;
      [state.album, state.tracks] = action.payload;
    },
  },
});

export const { setAlbum, setTracks, setLoaded } = albumSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAlbum = (state) => state.album.album;
export const selectTracks = (state) => state.album.tracks;
export const selectAlbumLoaded = (state) => state.album.loaded;

export default albumSlice.reducer;
