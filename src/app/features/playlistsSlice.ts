import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Auth,
  getPlaylist,
  getPlaylists,
  Playlist,
  PlaylistRequest,
} from "./api";
import { addSongs } from "./songSlice";
import { AppDispatch } from "../store";

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
    [key: string]: Playlist,
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
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
  },
  extraReducers: {
    [getPlaylistsFromApi.fulfilled]: (state, action) => {
      state.loaded = true;
      action.payload.forEach(
        (playlist) => (state.playlists[playlist.id] = playlist)
      );
    },
    [getPlaylistFromApi.fulfilled]: (state, action) => {
      const playlist = action.payload;
      state.playlists[playlist.id] = Object.assign(
        {},
        state.playlists[playlist.id],
        playlist
      );
    },
  },
});

export const { setPlayLists } = playlistsSlice.actions;

export const arePlaylistsLoaded = (state) => state.playlists.loaded;
export const getAllPlaylists = (state) =>
  Object.keys(state.playlists.playlists).map(
    (id) => state.playlists.playlists[id]
  );
export const getPlaylistById = (state, id) => state.playlists.playlists[id];

export default playlistsSlice.reducer;
