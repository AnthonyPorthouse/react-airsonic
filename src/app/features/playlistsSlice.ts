import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Auth,
  getPlaylist,
  getPlaylists,
  Playlist,
  PlaylistRequest,
} from "./api";
import { addSongs } from "./songSlice";
import { AppDispatch, RootState } from "../store";

export const getPlaylistsFromApi = createAsyncThunk<Playlist[], Auth>(
  "playlists/getPlayListsFromApi",
  async (req) => {
    return await getPlaylists(req);
  }
);

export const getPlaylistFromApi = createAsyncThunk<
  Playlist,
  PlaylistRequest,
  { dispatch: AppDispatch }
>("playlists/getPlaylistFromApi", async (req, { dispatch }) => {
  const [playlist, songs] = await getPlaylist(req);

  playlist.tracks = songs.map((song) => song.id);
  dispatch(addSongs(songs));

  return playlist;
});

interface PlaylistState {
  playlists: {
    [key: string]: Playlist;
  };
  loaded: boolean;
}

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: {},
    loaded: false,
  } as PlaylistState,
  reducers: {
    setPlaylists: (
      state,
      { payload }: { payload: { [key: string]: Playlist } }
    ) => {
      state.playlists = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlaylistsFromApi.fulfilled, (state, action) => {
      state.loaded = true;
      action.payload.forEach(
        (playlist) => (state.playlists[playlist.id] = playlist)
      );
    });

    builder.addCase(getPlaylistFromApi.fulfilled, (state, action) => {
      const playlist = action.payload;
      state.playlists[playlist.id] = Object.assign(
        {},
        state.playlists[playlist.id],
        playlist
      );
    });
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export const arePlaylistsLoaded = (state: RootState) => state.playlists.loaded;
export const getAllPlaylists = (state: RootState) =>
  Object.keys(state.playlists.playlists).map(
    (id) => state.playlists.playlists[id]
  );
export const getPlaylistById = (state: RootState, id: string) =>
  state.playlists.playlists[id];

export default playlistsSlice.reducer;
