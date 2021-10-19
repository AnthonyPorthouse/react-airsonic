import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import API, {Album, AlbumIds, AlbumRequest, Albums, Auth} from "./api";
import { addSongs } from "./songSlice";

export const getAllAlbumsFromApi = createAsyncThunk<Album[], Auth>(
  "albums/getAllAlbums",
  async (req: Auth) => {
    return await API.getAllAlbums(req);
  }
);

export const getAlbumFromApi = createAsyncThunk<
  Album,
  AlbumRequest,
  { dispatch: AppDispatch }
>("albums/getAlbum", async (req, { dispatch }) => {
  const [album, songs] = await API.getAlbum(req);

  album.tracks = songs.map((song) => song.id);
  dispatch(addSongs(songs));
  dispatch(setAlbum(album));

  return album;
});

interface AlbumState {
  albumOrder: AlbumIds;
  albums: {
    [key: string]: Album;
  };
  loaded: boolean;
}

export const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albumOrder: [],
    albums: {},
    loaded: false,
  } as AlbumState,
  reducers: {
    setAlbums: (state, action) => {
      action.payload.forEach(
        (album: Album) => (state.albums[album.id] = album)
      );
    },
    setAlbum: (state, action) => {
      const album = action.payload;
      state.albums[album.id] = Object.assign({}, state.albums[album.id], album);
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAlbumsFromApi.pending, (state) => {
      state.loaded = false;
      state.albums = {};
    });

    builder.addCase(getAllAlbumsFromApi.fulfilled, (state, action) => {
      state.loaded = true;
      state.albumOrder = action.payload.map((album) => album.id);
      action.payload.forEach(
        (album: Album) => (state.albums[album.id] = album)
      );
    });

    builder.addCase(getAlbumFromApi.fulfilled, (state, { payload: album }) => {
      state.loaded = true;
      state.albums[album.id] = Object.assign({}, state.albums[album.id], album);
    });
  },
});

export const { setAlbums, setAlbum, setLoaded } = albumsSlice.actions;

export const getAllAlbums = (state: RootState): Albums =>
  state.albums.albumOrder.map((id) => state.albums.albums[id]);
export const getAlbumsByIds = (state: RootState, ids: string[]): Albums =>
  ids.map((id) => state.albums.albums[id]);
export const getAlbumById = (state: RootState, id: string): Album =>
  state.albums.albums[id];
export const areAllAlbumsLoaded = (state: RootState) => state.albums.loaded;

export default albumsSlice.reducer;
