import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropZoneState {
  files: string[];
}

const initialState: DropZoneState = {
  files: [],
};

const dropZoneSlice = createSlice({
  name: "dropZone",
  initialState,
  reducers: {
    uploadFiles: (state, action: PayloadAction<string[]>) => {
      state.files = action.payload;
    },
  },
});

export const { uploadFiles } = dropZoneSlice.actions;
export default dropZoneSlice.reducer;
