import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import artistsReducer from "../features/artistsSlice";
import artistReducer from "../features/artistSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    artists: artistsReducer,
    artist: artistReducer,
  },
});
