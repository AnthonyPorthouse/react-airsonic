import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UpdateState {
  updateAvailable: boolean;
}

const updateSlice = createSlice({
  name: "update",
  initialState: {
    updateAvailable: false,
  } as UpdateState,
  reducers: {
    setUpdateAvailable: (state, { payload }: { payload: boolean }) => {
      state.updateAvailable = payload;
    },
  },
});

export const { setUpdateAvailable } = updateSlice.actions;

export const isUpdateAvailable = (state: RootState) =>
  state.update.updateAvailable;

export default updateSlice.reducer;
