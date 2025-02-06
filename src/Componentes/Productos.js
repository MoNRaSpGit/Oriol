import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct, deleteProduct } from "../Slice/productsSlice";
import { Modal, Button, Form } from "react-bootstrap"; // Importar componentes del modal
import "../Css/Productos.css";

const Productos = ({ onSeleccionarProducto }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({ id: "", name: "", price: "", image: "", description: "" });

  useEffect(() => {
    if (status === "idle") {
      console.log("⏳ Cargando productos desde Redux...");
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log("🖥️ Mostrando producto desde el store global:", products);
    }
  }, [products, status]);

  // Abrir modal y cargar datos actuales del producto
  const handleEdit = (producto) => {
    setProductToEdit(producto);
    setShowModal(true);
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
  };

  // Guardar cambios y actualizar Redux
  const handleSaveChanges = () => {
    dispatch(updateProduct(productToEdit));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("⚠️ ¿Seguro que quieres eliminar este producto?");
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  if (status === "loading") return <p className="text-center">Cargando productos...</p>;
  if (status === "failed") return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="text-center my-4">Agro insumos Productos</h2>
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center">No hay productos disponibles.</p>
        ) : (
          products.map((producto) => (
            <div key={producto.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img 
                  src={producto.image} 
                  alt={producto.name} 
                  className="card-img-top img-fluid product-image" 
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{producto.name}</h5>
                  <p className="card-text">{producto.description}</p>
                  <p className="card-text fw-bold">${producto.price}</p>
                  <button className="btn btn-primary m-1" onClick={() => onSeleccionarProducto(producto)}>
                    Agregar
                  </button>
                  <button className="btn btn-warning m-1" onClick={() => handleEdit(producto)}>
                    Editar
                  </button>
                  <button className="btn btn-danger m-1" onClick={() => handleDelete(producto.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para editar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productToEdit.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productToEdit.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={productToEdit.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={productToEdit.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productos;
