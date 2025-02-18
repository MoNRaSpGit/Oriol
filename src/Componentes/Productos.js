import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProductToDB, updateProduct, deleteProduct } from "../Slice/productsSlice";
import { Button } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import ModalProducto from "./ModalProducto"; // Importamos el nuevo modal
import { toast } from "react-toastify"; // ✅ Importamos Toastify
import "../Css/Productos.css";

const Productos = ({ onSeleccionarProducto }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productData, setProductData] = useState({ id: "", name: "", price: "", image: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleEdit = (producto) => {
    setProductData(producto);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddNewProduct = () => {
    setProductData({ id: "", name: "", price: "", image: "", description: "" });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleSave = () => {
    // 🔹 Validación: Verificar si los campos están vacíos
    if (!productData.name.trim() || !productData.price || !productData.description.trim()) {
        toast.error("❌ Debes completar todos los campos: Nombre, Precio y Descripción.");
        return; // ❌ No ejecuta la acción si hay errores
    }

    if (isEditMode) {
        dispatch(updateProduct(productData))
            .then(() => {
                toast.success("✅ Producto actualizado correctamente.");
            })
            .catch(() => {
                toast.error("❌ Error al actualizar el producto.");
            });
    } else {
        dispatch(addProductToDB(productData))
            .then(() => {
                toast.success("✅ Producto agregado correctamente.");
            })
            .catch(() => {
                toast.error("❌ Error al agregar el producto.");
            });
    }
    setShowModal(false);
};



  const handleDelete = (id) => {
    if (window.confirm("⚠️ ¿Seguro que quieres eliminar este producto?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };





  const filteredProducts = products.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") return <p className="text-center">Cargando productos...</p>;
  if (status === "failed") return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="text-center my-4">Agro Insumos - Productos</h2>

      {/* Botón para agregar nuevo producto */}
      <div className="text-center mb-4">
        <Button variant="success" onClick={handleAddNewProduct}>➕ Agregar Producto</Button>
      </div>

      {/* Input de búsqueda */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="🔍 Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de productos usando TarjetaProducto */}
      <div className="row">
        {filteredProducts.length === 0 ? (
          <p className="text-center">No se encontraron productos.</p>
        ) : (
          filteredProducts.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              // onSeleccionarProducto={onSeleccionarProducto}

              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Modal reutilizable para agregar/editar productos */}
      <ModalProducto
        show={showModal}
        onHide={() => setShowModal(false)}
        producto={productData}
        onChange={handleInputChange}
        onSave={handleSave}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Productos;
