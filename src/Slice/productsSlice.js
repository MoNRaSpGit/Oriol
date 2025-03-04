import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

// Definir variables directamente en el Slice
const local = "http://localhost:3001";
const produccion = "https://oriol-backend.onrender.com";

// Elige cuál usar
const API_BASE_URL = produccion; // Cambia entre 'local' y 'produccion'

const initialState = {
  products: [],
  productosSeleccionados: [],
  status: "idle",
  error: null,
};

// 🔹 Thunk para obtener productos desde el backend
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Error al obtener productos");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message;
  }
});

// 🔹 Thunk para agregar un nuevo producto
export const addProductToDB = createAsyncThunk(
  "products/addProduct",
  async (producto, { rejectWithValue }) => {
    try {
      // Aquí 'producto' ya incluye { name, price, description, currency, image }
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto), // <-- Se envía con currency
      });

      if (!response.ok) throw new Error("Error al agregar producto");

      const newProduct = await response.json(); // newProduct vendrá con currency
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Thunk para actualizar un producto
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (producto, { rejectWithValue }) => {
    try {
      // producto: { id, name, price, description, currency, image? }
      const response = await fetch(`${API_BASE_URL}/products/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!response.ok) throw new Error("Error al actualizar producto");

      // Recibimos { id, name, price, description, currency }
      return producto;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Thunk para eliminar un producto
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar producto");
      return id; // Devolvemos el ID eliminado
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Thunk para agregar un producto a la factura o actualizar su cantidad
export const addOrUpdateProduct = createAsyncThunk(
  "products/addOrUpdateProduct",
  async (producto, { getState, dispatch }) => {
    // "producto" debería traer { id, name, description, price, currency, ... }
    // O en tu caso "codigo" en vez de "id" si así lo manejas
    const state = getState().products;
    
    // <--- NOTA: "producto.codigo" vs "producto.id" ---
    // Asegúrate de ser consistente: si "producto" viene con "id",
    // y en 'productosSeleccionados' usas "codigo", hay que decidir cómo asignarlo.

    // 1) Buscamos si existe en la lista de seleccionados
    const productoExistente = state.productosSeleccionados.find(
      (p) => p.codigo === producto.codigo
    );

    if (productoExistente) {
      // Si el producto ya existe, solo aumentamos la cantidad
      const updatedProduct = {
        ...productoExistente,
        cantidad: productoExistente.cantidad + 1,
        total: (productoExistente.cantidad + 1) * producto.precio,
      };
      dispatch(updateProductQuantity(updatedProduct));
    } else {
      // Si no existe, lo agregamos
      // <--- CAMBIO: Copiamos "currency"
      const newProduct = {
        codigo: producto.id,           // o producto.codigo, depende de tu flujo
        name: producto.name,
        descripcion: producto.description,
        precio: producto.price,
        currency: producto.currency || "UYU", // <--- CAMBIO
        cantidad: 1,
        total: producto.price,
      };
      dispatch(addProduct(newProduct));
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productosSeleccionados.push(action.payload);
    },
    updateProductQuantity: (state, action) => {
      const index = state.productosSeleccionados.findIndex(
        (p) => p.codigo === action.payload.codigo
      );
      if (index !== -1) {
        state.productosSeleccionados[index].cantidad = action.payload.cantidad;
        state.productosSeleccionados[index].total = action.payload.total;
      }
    },
    removeProduct: (state, action) => {
      state.productosSeleccionados = state.productosSeleccionados.filter(
        (product) => product.codigo !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------- ADD ----------
      .addCase(addProductToDB.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProductToDB.rejected, (state, action) => {
        console.error("❌ Error al agregar producto:", action.payload);
      })
      // ---------- UPDATE ----------
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.error("❌ Error al actualizar producto:", action.payload);
      })
      // ---------- FETCH ----------
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // ---------- DELETE ----------
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
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

export const { addProduct, updateProductQuantity, removeProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
