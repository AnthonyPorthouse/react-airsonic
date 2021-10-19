import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {Song, SongIds, Songs} from "./api";

interface SongState {
  songs: {
    [key: string]: Song;
  };
}

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: {},
  } as SongState,
  reducers: {
    addSongs: (state, { payload }: { payload: Song[] }) => {
      payload.forEach((song) => (state.songs[song.id] = song));
    },
  },
});

export const { addSongs } = songSlice.actions;

export const getAllSongs = (state: RootState): Songs => Object.values(state.songs.songs);

export const getSongById = (state: RootState, id?: string): Song|null => {
  if (!id) {
    return null;
  }

  return state.songs.songs[id];
};

export const getSongsByIds = (state: RootState, ids: SongIds): Songs =>
  ids.map((id) => state.songs.songs[id]);

export default songSlice.reducer;
