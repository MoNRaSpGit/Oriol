// src/Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slice/productsSlice";
import loginReducer from "../Slice/LoginSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    login: loginReducer,
  },
});

export default store;
