import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import artistsReducer from "../features/artistsSlice";
import artistReducer from "../features/artistSlice";
import albumsReducer from "../features/albumsSlice";
import albumReducer from "../features/albumSlice";
import playlistReducer from "../features/playlistSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    albums: albumsReducer,
    album: albumReducer,
    artists: artistsReducer,
    artist: artistReducer,
    playlist: playlistReducer,
  },
});
