// src/Slice/configSlice.js
import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    tasaDolar: 43, // Valor inicial
  },
  reducers: {
    setTasaDolar: (state, action) => {
      state.tasaDolar = action.payload;
    },
  },
});

export const { setTasaDolar } = configSlice.actions;
export default configSlice.reducer;
