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
  message: "",
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
    clearMessage(state) {
      state.userInfo = null;
      state.token = null;
      state.isLogged = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.userInfo = action.payload.result;
      state.isLoading = false;
    });
    builder.addCase(getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      if (action.error.message === "jwt expired") {
        state.userInfo = null;
        state.token = null;
        state.isLogged = false;
        state.message = "Login session has expired";
      }
    });
  },
});

export const { login, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer;
