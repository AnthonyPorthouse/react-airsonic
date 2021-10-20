import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import API, {
  Album,
  Artist,
  ArtistIds,
  ArtistRequest,
  Artists,
  Auth,
} from "./api";
import { setAlbum } from "./albumsSlice";
import { AppDispatch, RootState } from "../store";

export const getArtistsFromApi = createAsyncThunk<Artist[], Auth>(
  "artists/getArtistsFromApi",
  async (auth) => {
    return await API.getArtists(auth);
  }
);

export const getArtistFromApi = createAsyncThunk<
  Artist,
  ArtistRequest,
  { dispatch: AppDispatch }
>("artists/getArtistFromApi", async (req, { dispatch }) => {
  const [artist, albums] = await API.getArtist(req);
  albums.forEach((album: Album) => dispatch(setAlbum(album)));
  artist.albums = albums.map((album: Album) => album.id);

  return artist;
});

interface ArtistsState {
  artists: {
    [key: string]: Artist;
  };
  loaded: boolean;
}

export const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    artists: {},
    loaded: false,
  } as ArtistsState,
  reducers: {
    setArtists: (state, action) => {
      action.payload.forEach(
        (artist: Artist) => (state.artists[artist.id] = artist)
      );
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
  extraReducers: (builder) => {
    builder.addCase(getArtistsFromApi.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(getArtistsFromApi.fulfilled, (state, action) => {
      state.loaded = true;
      action.payload.forEach((artist) => (state.artists[artist.id] = artist));
    });

    builder.addCase(getArtistFromApi.fulfilled, (state, action) => {
      const artist = action.payload;
      state.artists[artist.id] = artist;
    });
  },
});

export const { setArtists } = artistsSlice.actions;

export const getArtists = (state: RootState): Artists =>
  Object.keys(state.artists.artists).map((key) => state.artists.artists[key]);
export const getArtistById = (state: RootState, id: string): Artist =>
  state.artists.artists[id];
export const getArtistsByIds = (state: RootState, ids: ArtistIds): Artists =>
  ids.map((id) => state.artists.artists[id]);
export const areArtistsLoaded = (state: RootState) => state.artists.loaded;

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
