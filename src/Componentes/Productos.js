// src/Componentes/Productos.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProductToDB,
  updateProduct,
  deleteProduct,
} from "../Slice/productsSlice";
import { Button } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import ModalProductoLocal from "../Componentes/ModalProducto"; // <--- IMPORTAMOS EL NUEVO MODAL LOCAL
import { toast } from "react-toastify";
import "../Css/Productos.css";

const Productos = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  // Controla si el modal está abierto
  const [showModal, setShowModal] = useState(false);
  // Indica si estamos editando o creando
  const [isEditMode, setIsEditMode] = useState(false);
  // Almacena el producto a editar (o null si agregamos uno nuevo)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Campo de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar productos al inicio
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Abrir modal en modo EDICIÓN
  const handleEdit = (producto) => {
    setProductoSeleccionado(producto); // Guardamos el producto a editar
    setIsEditMode(true);
    setShowModal(true);
  };

  // Abrir modal en modo AGREGAR
  const handleAddNewProduct = () => {
    setProductoSeleccionado(null); // Nuevo producto => sin datos
    setIsEditMode(false);
    setShowModal(true);
  };

  // Al GUARDAR, se llama desde el modal => validamos y despachamos
  const handleSave = (nuevoProducto) => {
    // Validar
    if (
      !nuevoProducto.name.trim() ||
      !nuevoProducto.price ||
      !nuevoProducto.description.trim()
    ) {
      toast.error("❌ Faltan Nombre, Precio o Descripción.");
      return;
    }

    if (isEditMode && productoSeleccionado?.id) {
      // EDITAMOS
      dispatch(updateProduct({ ...productoSeleccionado, ...nuevoProducto }))
        .then(() => {
          toast.success(" Producto actualizado correctamente.");
        })
        .catch(() => {
          toast.error("❌ Error al actualizar producto.");
        });
    } else {
      // CREAMOS
      dispatch(addProductToDB(nuevoProducto))
        .then(() => {
          toast.success(" Producto agregado correctamente.");
        })
        .catch(() => {
          toast.error("❌ Error al agregar producto.");
        });
    }

    setShowModal(false); // Cerrar el modal
  };

  // Eliminar
  const handleDelete = (id) => {
    if (window.confirm("⚠️ ¿Seguro que quieres eliminar este producto?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Filtrado
  const filteredProducts = products.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejo de estados "loading", "failed"
  if (status === "loading") {
    return <p className="text-center">Cargando productos...</p>;
  }
  if (status === "failed") {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Agro Insumos - Productos</h2>

      {/* Botón agregar */}
      <div className="text-center mb-4">
        <Button variant="success" onClick={handleAddNewProduct}>
          ➕ Agregar Producto
        </Button>
      </div>

      {/* Búsqueda */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="🔍 Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
      <div className="row">
        {filteredProducts.length === 0 ? (
          <p className="text-center">No se encontraron productos.</p>
        ) : (
          filteredProducts.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Modal con estado local */}
      <ModalProductoLocal
        show={showModal}
        onHide={() => setShowModal(false)}
        isEditMode={isEditMode}
        // Producto a editar (o {} si no hay nada)
        initialProducto={productoSeleccionado || {}}
        onSave={handleSave}
      />
    </div>
  );
};

export default Productos;
