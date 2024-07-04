"use client";

// import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a simple counter slice
const storeLocationSlice = createSlice({
  name: "storeLocation",
  initialState: {
    storeLocation: "",
    sessionUser: "",
  },
  reducers: {
    setStoreLocation: (state, action) => {
      state.storeLocation = action.payload;
    },
    authSuccess: (state, action) => {
      state.sessionUser = action.payload;
    },
    destroyLoggedin: (state) => {
      state.sessionUser = "";
      state.storeLocation = "";
    },
  },
});

export const { setStoreLocation, authSuccess, destroyLoggedin } =
  storeLocationSlice.actions;
export default storeLocationSlice.reducer;

// Create the Redux store
// const store = configureStore({
//   reducer: {
//     storeLocation: storeLocationSlice.reducer,
//   },
// });

// export default store;
