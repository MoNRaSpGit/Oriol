import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slice/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
