import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";
import { setArtists } from "./artistsSlice";
import { setAlbums } from "./albumsSlice";
import { addSongs } from "./songSlice";

export const getSearchResultsFromApi = createAsyncThunk(
  "search/getSearchResultsFromApi",
  async (req, { dispatch }) => {
    const [artists, albums, songs] = await API.getSearchResults(req);

    dispatch(setArtists(artists));
    dispatch(setAlbums(albums));
    dispatch(addSongs(songs));

    return {
      artists: artists.map((artist) => artist.id),
      albums: albums.map((album) => album.id),
      songs: songs.map((song) => song.id),
    };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    artists: [],
    albums: [],
    songs: [],
    loaded: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
  extraReducers: {
    [getSearchResultsFromApi.fulfilled]: (state, action) => {
      state.loaded = true;
      state.artists = action.payload.artists || [];
      state.albums = action.payload.albums || [];
      state.songs = action.payload.songs || [];
    },
  },
});

export const getResults = (state) => ({
  artists: state.search.artists,
  albums: state.search.albums,
  songs: state.search.songs,
});

export default searchSlice.reducer;
