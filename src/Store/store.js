import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slice/productsSlice";
import loginReducer from "../Slice/LoginSlice";
import configReducer from "../Slice/configSlice";
import proveedoresReducer from "../Slice/proveedoresSlice"; // <--- Importar

const store = configureStore({
  reducer: {
    products: productsReducer,
    login: loginReducer,
    config: configReducer,
    proveedores: proveedoresReducer, // <--- Agregar
  },
});

export default store;
