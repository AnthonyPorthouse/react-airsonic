import { createSelector, createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: {},
  },
  reducers: {
    addSongs: (state, action) => {
      action.payload.forEach((song) => (state.songs[song.id] = song));
    },
  },
});

export const { addSongs } = songSlice.actions;

export const getAllSongs = (state) => state.songs.songs;

export const getSongById = (state, id) => state.songs.songs[id];

export const getSongsByIds = (state, ids) =>
  ids.map((id) => state.songs.songs[id]);

export default songSlice.reducer;
