import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productosSeleccionados: [],
  status: "idle",
  error: null,
};

// 🔹 Thunk para obtener productos desde el backend
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch("http://localhost:3001/products");
    if (!response.ok) throw new Error("Error al obtener productos");
    const data = await response.json();

    console.log("📦 Productos obtenidos:", data);
    return data;
  } catch (error) {
    throw error.message;
  }
});

// 🔹 Thunk para agregar un nuevo producto a la base de datos
export const addProductToDB = createAsyncThunk("products/addProduct", async (producto, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    if (!response.ok) throw new Error("Error al agregar producto");

    const newProduct = await response.json();
    console.log("✅ Producto agregado a la BD:", newProduct);
    return newProduct;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 🔹 Thunk para actualizar un producto en la base de datos
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

// 🔹 Thunk para eliminar un producto de la base de datos
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar producto");

    console.log(`🗑️ Producto eliminado con ID: ${id}`);
    return id; // Devolvemos el ID eliminado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 🔹 Thunk para agregar un producto a la factura o actualizar su cantidad
export const addOrUpdateProduct = createAsyncThunk(
  "products/addOrUpdateProduct",
  async (producto, { getState, dispatch }) => {
    const state = getState().products;
    const productoExistente = state.productosSeleccionados.find(p => p.codigo === producto.codigo);

    if (productoExistente) {
      // Si el producto ya existe, solo aumentamos la cantidad
      const updatedProduct = { 
        ...productoExistente, 
        cantidad: productoExistente.cantidad + 1,
        total: (productoExistente.cantidad + 1) * producto.precio
      };
      dispatch(updateProductQuantity(updatedProduct));
    } else {
      // Si no existe, lo agregamos con todos los datos del producto
      const newProduct = { 
        codigo: producto.id,
        name: producto.name,
        descripcion: producto.description,
        precio: producto.price,
        cantidad: 1,
        total: producto.price
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
      const index = state.productosSeleccionados.findIndex(p => p.codigo === action.payload.codigo);
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
      .addCase(addProductToDB.fulfilled, (state, action) => {
        state.products.push(action.payload);
        console.log("✅ Producto agregado al store global:", state.products);
      })
      .addCase(addProductToDB.rejected, (state, action) => {
        console.error("❌ Error al agregar producto:", action.payload);
      })
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

        console.log("✅ Productos guardados en el store global:", state.products);
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

export const { addProduct, updateProductQuantity, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
