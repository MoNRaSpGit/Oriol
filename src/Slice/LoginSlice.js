import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Definir variables directamente en el Slice
const local = "http://localhost:3001";
const produccion = "https://oriol-backend.onrender.com";

// Elige cuál usar (cambia manualmente)
const API_BASE_URL = produccion; // ⚠️ Cambia entre 'local' y 'produccion'

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Credenciales inválidas");
      }

      return data.usuario;
    } catch (error) {
      return rejectWithValue("Error de conexión con el servidor.");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
