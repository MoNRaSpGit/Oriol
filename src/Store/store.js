// src/Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slice/productsSlice";
import loginReducer from "../Slice/LoginSlice";
import configReducer from "../Slice/configSlice"; // <--- Importamos

const store = configureStore({
  reducer: {
    products: productsReducer,
    login: loginReducer,
    config: configReducer, // <--- Registramos config
  },
});

export default store;
