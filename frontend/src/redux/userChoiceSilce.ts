import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserChoiceState {
  selectedOptions: string[];
}

const initialState: UserChoiceState = {
  selectedOptions: [],
};

const userChoiceSlice = createSlice({
  name: "userChoice",
  initialState,
  reducers: {
    storeSelectedOptions: (state, action: PayloadAction<string[]>) => {
      state.selectedOptions = action.payload;
    },
  },
});

export const { storeSelectedOptions } = userChoiceSlice.actions;
export default userChoiceSlice.reducer;
