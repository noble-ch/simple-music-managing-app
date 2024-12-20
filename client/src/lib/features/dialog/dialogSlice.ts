import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  value: { isDialogOpen: boolean };
} = {
  value: { isDialogOpen: false },
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateIsDialogOpen(state, action: PayloadAction<boolean>) {
      state.value.isDialogOpen = action.payload;
    },
  },
});

export const { updateIsDialogOpen } = dialogSlice.actions;
export default dialogSlice.reducer;
