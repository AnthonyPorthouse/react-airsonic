import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    currentTrack: null,
    tracks: [],
    playing: false,
  },
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    getNextTrack: (state, action) => {
      const tracks = state.tracks;
      state.currentTrack = tracks.shift();
      state.tracks = tracks;
    },
  },
});

export const { setCurrentTrack, setTracks, setPlaying, getNextTrack } =
  playlistSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCurrentTrack = (state) => state.playlist.currentTrack;
export const selectTracks = (state) => state.playlist.tracks;
export const selectAlbumLoaded = (state) => state.playlist.playing;

export default playlistSlice.reducer;
