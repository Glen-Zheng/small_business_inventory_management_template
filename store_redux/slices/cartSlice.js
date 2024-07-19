"use client";

// import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a simple counter slice

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index === -1) state.cart.push(action.payload);
      else state.cart[index] = action.payload;
    },
    removeFromCart: (state, action) => {},
    dropFromCart: (state, action) => {
      state.cart.splice(
        state.cart.findIndex((element) => element.id === action.payload),
        1
      );
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    increaseItemQuantity: (state, action) => {
      //item alreay exists in cart
      state.cart[
        state.cart.findIndex((element) => element.id === action.payload)
      ].quantity++;
    },
    decreaseItemQuantity: (state, action) => {
      const i = state.cart.findIndex(
        (element) => element.id === action.payload
      );
      if (i !== -1) {
        if (state.cart[i].quantity == 1) {
          state.cart.splice(i, 1);
        } else {
          state.cart[i].quantity--;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  dropFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Create the Redux store
// const store = configureStore({
//   reducer: {
//     storeLocation: storeLocationSlice.reducer,
//   },
// });

// export default store;
