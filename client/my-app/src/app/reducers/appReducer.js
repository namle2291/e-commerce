import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isShowQuickView: false,
   productInfo: {},
};

const userSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      showQuickView(state, action) {
         state.isShowQuickView = action.payload;
      },
      setProductInfo(state, action) {
         state.productInfo = action.payload;
      },
      resetProductInfo(state, action) {
         state.productInfo = {};
      },
   },
});

export const { showQuickView, setProductInfo, resetProductInfo } =
   userSlice.actions;
export default userSlice.reducer;
