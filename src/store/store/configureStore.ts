// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import productsReducer from "./productSlice";

const store = configureStore({
  reducer:{
    user: userReducer,
    products: productsReducer
  }
});

export default store;
