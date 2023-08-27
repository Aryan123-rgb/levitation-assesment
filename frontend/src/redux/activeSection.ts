import { createSlice } from "@reduxjs/toolkit";

interface ActiveSectionState {
  currentSection: string;
}

const initialState: ActiveSectionState = {
  currentSection: "BasicDetails",
};

const activeSectionSlice = createSlice({
  name: "activeSection",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setCurrentSection } = activeSectionSlice.actions;
export default activeSectionSlice.reducer;
