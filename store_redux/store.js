import { configureStore } from "@reduxjs/toolkit";
import storeLocationReducer from "./slices/storeUserSlice";
import cartReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    storeLocation: storeLocationReducer,
    cart: cartReducer,
  },
});

export default store;
