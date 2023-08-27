import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  firstname: string;
  lastname: string;
  phoneNumber: number;
  email: string;
  password: string;
  addressLine1: string;
  city1: string;
  state1: string;
  pincode1: number;
  addressLine2: string;
  city2: string;
  state2: string;
  pincode2: number;
}

const initialState = {
  userDetails: {
    firstname: "",
    lastname: "",
    phoneNumber: 0,
    email: "",
    password: "",
    addressLine1: "",
    city1: "",
    state1: "",
    pincode1: 0,
    addressLine2: "",
    city2: "",
    state2: "",
    pincode2: 0,
  },
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { updateUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
