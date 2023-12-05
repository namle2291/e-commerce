import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "../../axios/custom-axios";

export const getCurrent = createAsyncThunk("user/getCurrent", async () => {
  const response = await httpRequest.get("/users/current");
  return response;
});

const initialState = {
  userInfo: null,
  token: null,
  isLogged: false,
  isLoading: false,
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
    logout(state, action) {
      state.userInfo = null;
      state.token = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrent.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.userInfo = action.payload.result;
      state.isLoading = false;
    });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
