import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateProduct, updateProductQuantity, removeProduct, deleteProduct } from "../Slice/productsSlice";
import { Button, Modal } from "react-bootstrap";
import { FaFileInvoice, FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import logoOrio from "../Img/logoOriol2.png"; // ✅ Importamos la imagen por defecto

const TarjetaProducto = ({ producto, onEdit }) => {
  const dispatch = useDispatch();
  const productosSeleccionados = useSelector((state) => state.products.productosSeleccionados);
  const [cantidad, setCantidad] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleAgregar = () => {
    if (productosSeleccionados.length >= 8) {
      toast.warning("⚠️ Has alcanzado el límite de 8 productos. Se recomienda hacer otra factura.");
      return;
    }
    setCantidad(1);
    dispatch(addOrUpdateProduct({ 
      codigo: producto.id, 
      ...producto 
    }));
  };

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
    dispatch(updateProductQuantity({ codigo: producto.id, cantidad: cantidad + 1 }));
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      dispatch(updateProductQuantity({ codigo: producto.id, cantidad: cantidad - 1 }));
    } else {
      setCantidad(0);
      dispatch(removeProduct(producto.id)); // ✅ Solo lo quita de la factura, NO de la BD
      toast.info(`🗑️ ${producto.name} eliminado de la factura.`);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <img 
          src={producto.image && producto.image.trim() !== "" ? producto.image : logoOrio} // ✅ Usamos la imagen por defecto
          alt={producto.name} 
          className="card-img-top img-fluid product-image" 
        />
        <div className="card-body text-center">
          <h5 className="card-title">{producto.name}</h5>
          <p className="card-text">{producto.description}</p>
          <p className="card-text fw-bold">${producto.price}</p>

          {cantidad > 0 ? (
            <div className="cantidad-container">
              <Button variant="outline-secondary" className="btn-cantidad" onClick={incrementarCantidad}>
                <FaPlus />
              </Button>
              <span className="cantidad-numero">{cantidad}</span>
              <Button variant="outline-secondary" className="btn-cantidad" onClick={decrementarCantidad}>
                <FaMinus />
              </Button>
            </div>
          ) : (
            <>
              <Button className="btn btn-primary m-1" onClick={handleAgregar}>
                <FaFileInvoice className="me-1" /> Agregar
              </Button>
              <Button className="btn btn-warning m-1" onClick={() => onEdit(producto)}>
                <FaEdit className="me-1" /> Editar
              </Button>
              <Button className="btn btn-danger m-1" onClick={() => setShowModal(true)}>
                <FaTrash className="me-1" /> Eliminar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar producto de la BD */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar <strong>{producto.name}</strong> de la base de datos?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
          <Button variant="danger" onClick={() => {
            dispatch(deleteProduct(producto.id)); 
            setShowModal(false);
            toast.success("✅ Producto eliminado de la base de datos.");
          }}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TarjetaProducto;
