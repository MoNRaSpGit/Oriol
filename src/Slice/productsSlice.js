import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productosSeleccionados: [],
  status: "idle",
  error: null,
};

// Thunk para obtener productos desde el backend
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch("http://localhost:3001/products");
    if (!response.ok) throw new Error("Error al obtener productos");
    const data = await response.json();
    
    console.log("📦 Producto llegando de la API:", data);
    return data;
  } catch (error) {
    throw error.message;
  }
});
// Thunk para actualizar un producto
export const updateProduct = createAsyncThunk("products/updateProduct", async (producto, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
  
      if (!response.ok) throw new Error("Error al actualizar producto");
      
      console.log("✅ Producto actualizado:", producto);
      return producto;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  

// Thunk para eliminar un producto
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar producto");
    
    console.log(`🗑️ Producto eliminado con ID: ${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productosSeleccionados.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.productosSeleccionados = state.productosSeleccionados.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
    
    .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        console.log("✅ Producto actualizado en el store global:", state.products);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.error("❌ Error al actualizar producto:", action.payload);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        
        console.log("✅ Producto guardado en el store global:", state.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
        
        console.log("✅ Producto eliminado del store global:", state.products);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.error("❌ Error al eliminar producto:", action.payload);
      });
  },
});

// 🔹 Selector optimizado con memoización
export const selectProductosSeleccionados = createSelector(
  (state) => state.products.productosSeleccionados,
  (productos) => productos
);

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
