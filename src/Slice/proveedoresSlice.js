// src/Slice/proveedoresSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  proveedores: [
    // Ejemplo de datos iniciales:
    {
      id: "1",
      nombre: "Coca Cola",
      deuda: 5000,
      descripcion: "Pago pendiente de refrescos",
      fecha: "2025-03-01",
    },
    {
      id: "2",
      nombre: "Pepsi",
      deuda: 3000,
      descripcion: "Pago adelantado de productos diet",
      fecha: "2025-03-15",
    },
  ],
  status: "idle",
  error: null,
};

const proveedoresSlice = createSlice({
  name: "proveedores",
  initialState,
  reducers: {
    // Create
    addProveedor: {
      reducer: (state, action) => {
        state.proveedores.push(action.payload);
      },
      prepare: (nuevoProveedor) => {
        // Genera un id único con nanoid
        return {
          payload: {
            id: nanoid(),
            ...nuevoProveedor,
          },
        };
      },
    },
    // Update
    updateProveedor: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.proveedores.findIndex((prov) => prov.id === id);
      if (index !== -1) {
        state.proveedores[index] = { ...state.proveedores[index], ...rest };
      }
    },
    // Delete
    deleteProveedor: (state, action) => {
      const id = action.payload;
      state.proveedores = state.proveedores.filter((prov) => prov.id !== id);
    },
  },
});

export const { addProveedor, updateProveedor, deleteProveedor } =
  proveedoresSlice.actions;

export default proveedoresSlice.reducer;
