import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylist, getPlaylists } from "./api";
import { addSongs } from "./songSlice";

export const getPlaylistsFromApi = createAsyncThunk(
  "playlists/getPlayListsFromApi",
  async (req, { dispatch }) => {
    return await getPlaylists(req);
  }
);

export const getPlaylistFromApi = createAsyncThunk(
  "playlists/getPlaylistFromApi",
  async (req, { dispatch }) => {
    const [playlist, songs] = await getPlaylist(req);

    playlist.tracks = songs.map((song) => song.id);
    dispatch(addSongs(songs));

    return playlist;
  }
);

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: {},
    loaded: false,
  },
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
