import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";
import { addSongs } from "./songSlice";

export const getAllAlbumsFromApi = createAsyncThunk(
  "albums/getAllAlbums",
  async (req, thunkAPI) => {
    return await API.getAllAlbums(req);
  }
);

export const getAlbumFromApi = createAsyncThunk(
  "albums/getAlbum",
  async (req, { dispatch }) => {
    const [album, songs] = await API.getAlbum(req);

    album.tracks = songs.map((song) => song.id);
    dispatch(addSongs(songs));
    dispatch(setAlbum(album));

    return album;
  }
);

export const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albumOrder: [],
    albums: {},
    loaded: false,
  },
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setAlbum: (state, action) => {
      const album = action.payload;
      state.albums[album.id] = Object.assign({}, state.albums[album.id], album);
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: {
    [getAllAlbumsFromApi.pending]: (state, action) => {
      state.loaded = false;
      state.albums = {};
    },
    [getAllAlbumsFromApi.fulfilled]: (state, action) => {
      state.loaded = true;
      state.albumOrder = action.payload.map((album) => album.id);
      action.payload.forEach((album) => (state.albums[album.id] = album));
    },
    [getAlbumFromApi.fulfilled]: (state, action) => {
      state.loaded = true;
      const album = action.payload;
      state.albums[album.id] = album;
    },
  },
});

export const { setAlbums, setAlbum, setLoaded } = albumsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getAllAlbums = (state) =>
  state.albums.albumOrder.map((id) => state.albums.albums[id]);
export const getAlbumsByIds = (state, ids) =>
  ids.map((id) => state.albums.albums[id]);
export const getAlbumById = (state, id) => state.albums.albums[id];
export const areAllAlbumsLoaded = (state) => state.albums.loaded;

export default albumsSlice.reducer;
