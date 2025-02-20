// src/Slice/LoginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asíncrona para iniciar sesión con la API (endpoint /login)
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el servidor retorna error o credenciales inválidas
        return rejectWithValue(data.error || "Credenciales inválidas");
      }

      // Si la respuesta es OK, retornamos los datos del usuario
      return data.usuario; // { id, username, ... }
    } catch (error) {
      return rejectWithValue("Error de conexión con el servidor.");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false, // Indica si el usuario está logueado
    user: null,             // Datos del usuario (id, username, etc.)
    loading: false,         // Para estado de carga
    error: null,            // Mensaje de error si falla el login
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Petición en curso
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Petición exitosa
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      // Petición con error
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
