import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  token: "",
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.isLogged = action.payload.isLogged;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
