import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "update",
  initialState: {
    updateAvailable: false,
  },
  reducers: {
    setUpdateAvailable: (state, action) => {
      state.updateAvailable = action.payload;
    },
  },
});

export const { setUpdateAvailable } = updateSlice.actions;

export const isUpdateAvailable = (state) => state.update.updateAvailable;

export default updateSlice.reducer;
