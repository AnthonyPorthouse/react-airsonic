import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import artistsReducer from "../features/artistsSlice";
import albumsReducer from "../features/albumsSlice";
import playlistReducer from "../features/playlistSlice";
import playlistsReducer from "../features/playlistsSlice";
import songReducer from "../features/songSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    albums: albumsReducer,
    artists: artistsReducer,
    playlist: playlistReducer,
    playlists: playlistsReducer,
    songs: songReducer,
  },
});
