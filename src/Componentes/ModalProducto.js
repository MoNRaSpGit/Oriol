// src/Componentes/ModalProductoLocal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 * Modal con estado local para evitar lag.
 *
 * @param {boolean} show         Indica si se muestra el modal
 * @param {function} onHide      Cierra el modal sin guardar
 * @param {object} initialProducto  Datos iniciales para editar (o vacío para agregar)
 * @param {boolean} isEditMode   true = editar, false = nuevo
 * @param {function} onSave      Se llama al confirmar, pasando el objeto local
 */
const ModalProductoLocal = ({
  show,
  onHide,
  initialProducto = {},
  isEditMode,
  onSave,
}) => {
  // Estado local: donde guardamos los datos del formulario
  const [localProducto, setLocalProducto] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  // Al abrir el modal o cambiar 'initialProducto', copiamos sus valores
  useEffect(() => {
    if (initialProducto) {
      setLocalProducto({
        name: initialProducto.name || "",
        price: initialProducto.price || "",
        image: initialProducto.image || "",
        description: initialProducto.description || "",
      });
    }
  }, [initialProducto]);

  // Maneja cambios en los inputs. Actualiza SOLO el estado local
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Al guardar => llamamos onSave con los datos locales
  const handleSave = () => {
    onSave(localProducto);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* NOMBRE */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={localProducto.name}
              onChange={handleChange}
            />
          </Form.Group>

          {/* PRECIO */}
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={localProducto.price}
              onChange={handleChange}
            />
          </Form.Group>

          {/* IMAGEN */}
          <Form.Group className="mb-3">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={localProducto.image}
              onChange={handleChange}
            />
          </Form.Group>

          {/* DESCRIPCIÓN */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={localProducto.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSave}>
          {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProductoLocal;
