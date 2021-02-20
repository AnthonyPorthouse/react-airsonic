import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import API from "./api";
import { setAlbum } from "./albumsSlice";

export const getArtistsFromApi = createAsyncThunk(
  "artists/getArtistsFromApi",
  async (auth, thunkAPI) => {
    return await API.getArtists(auth);
  }
);

export const getArtistFromApi = createAsyncThunk(
  "artists/getArtistFromApi",
  async (req, { dispatch }) => {
    const [artist, albums] = await API.getArtist(req);
    albums.forEach((album) => dispatch((state) => setAlbum(state, album)));
    artist.albums = albums.map((album) => album.id);

    return artist;
  }
);

export const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    artists: {},
    loaded: false,
  },
  reducers: {
    setArtists: (state, action) => {
      action.payload.forEach((artist) => (state.artists[artist.id] = artist));
    },
    setArtist: (state, action) => {
      const artist = action.payload;
      state.artists[artist.id] = Object.assign(
        {},
        state.artists[artist.id],
        artist
      );
    },
  },
  extraReducers: {
    [getArtistsFromApi.pending]: (state, action) => {
      state.loaded = true;
    },
    [getArtistsFromApi.fulfilled]: (state, action) => {
      state.loaded = true;
      action.payload.forEach((artist) => (state.artists[artist.id] = artist));
    },
    [getArtistFromApi.fulfilled]: (state, action) => {
      const artist = action.payload;
      state.artists[artist.id] = artist;
    },
  },
});

export const { setArtists } = artistsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getArtists = (state) =>
  Object.keys(state.artists.artists).map((key) => state.artists.artists[key]);
export const getArtistById = (state, id) => state.artists.artists[id];
export const artArtistsLoaded = (state) => state.artists.loaded;

export const getArtistsAlphabetically = createSelector(
  [getArtists],
  (artists) =>
    artists.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return 0;
    })
);

export default artistsSlice.reducer;
