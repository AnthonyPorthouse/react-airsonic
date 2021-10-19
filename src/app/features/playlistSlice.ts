import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {SongIds} from "./api";

interface PlaylistState {
  currentTrack?: string;
  tracks: SongIds;
  playing: boolean;
}

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    currentTrack: undefined,
    tracks: [],
    playing: false,
  } as PlaylistState,
  reducers: {
    setCurrentTrack: (state, { payload }: { payload: string }) => {
      state.currentTrack = payload;
    },
    setTracks: (state, { payload }: { payload: string[] }) => {
      state.tracks = payload;
    },
    setPlaying: (state, { payload }: { payload: boolean }) => {
      state.playing = payload;
    },
    getNextTrack: (state) => {
      const tracks = state.tracks;
      state.currentTrack = tracks.shift();
      state.tracks = tracks;
    },
  },
});

export const { setCurrentTrack, setTracks, setPlaying, getNextTrack } =
  playlistSlice.actions;

export const selectCurrentTrack = (state: RootState) =>
  state.playlist.currentTrack;
export const selectTracks = (state: RootState) => state.playlist.tracks;
export const selectAlbumLoaded = (state: RootState) => state.playlist.playing;

export default playlistSlice.reducer;
