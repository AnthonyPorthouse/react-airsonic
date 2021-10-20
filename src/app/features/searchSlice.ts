import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { AlbumIds, ArtistIds, SearchRequest, SongIds } from "./api";
import { setArtists } from "./artistsSlice";
import { setAlbums } from "./albumsSlice";
import { addSongs } from "./songSlice";
import { AppDispatch, RootState } from "../store";

type SearchResults = {
  artists: ArtistIds;
  albums: AlbumIds;
  songs: SongIds;
};

export const getSearchResultsFromApi = createAsyncThunk<
  SearchResults,
  SearchRequest,
  { dispatch: AppDispatch }
>("search/getSearchResultsFromApi", async (req, { dispatch }) => {
  const [artists, albums, songs] = await API.getSearchResults(req);

  dispatch(setArtists(artists));
  dispatch(setAlbums(albums));
  dispatch(addSongs(songs));

  return {
    artists: artists.map((artist) => artist.id),
    albums: albums.map((album) => album.id),
    songs: songs.map((song) => song.id),
  };
});

interface SearchState {
  query: string;
  artists: ArtistIds;
  albums: AlbumIds;
  songs: SongIds;
  loaded: boolean;
}

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    artists: [],
    albums: [],
    songs: [],
    loaded: false,
  } as SearchState,
  reducers: {
    setQuery: (state, { payload }: { payload: string }) => {
      state.query = payload;
    },
    setArtists: (state, { payload }: { payload: string[] }) => {
      state.artists = payload;
    },
    setAlbums: (state, { payload }: { payload: string[] }) => {
      state.albums = payload;
    },
    setSongs: (state, { payload }: { payload: string[] }) => {
      state.songs = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResultsFromApi.fulfilled, (state, action) => {
      state.loaded = true;
      state.artists = action.payload.artists || [];
      state.albums = action.payload.albums || [];
      state.songs = action.payload.songs || [];
    });
  },
});

export const getResults = (state: RootState): SearchResults => ({
  artists: state.search.artists,
  albums: state.search.albums,
  songs: state.search.songs,
});

export default searchSlice.reducer;
