// src/Componentes/ModalProductoLocal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 * Modal con estado local para evitar lag.
 *
 * @param {boolean} show           Indica si se muestra el modal
 * @param {function} onHide        Cierra el modal sin guardar
 * @param {object} initialProducto Datos iniciales para editar (o vacío para agregar)
 * @param {boolean} isEditMode     true = editar, false = nuevo
 * @param {function} onSave        Se llama al confirmar, pasando el objeto local
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

  // Maneja cambios en los inputs de texto/textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el input de tipo "file" para la imagen (abre explorador de archivos)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convertimos el archivo seleccionado a Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalProducto((prev) => ({
        ...prev,
        image: reader.result, // Base64
      }));
    };
    reader.readAsDataURL(file);
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
              placeholder="Ingresa el nombre del producto"
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
              placeholder="Ingresa el precio"
            />
          </Form.Group>

          {/* IMAGEN (Seleccionar archivo) */}
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {/**
             * Si quieres mostrar una previsualización de la imagen seleccionada:
             */}
            {localProducto.image && localProducto.image.startsWith("data:image/") && (
              <div style={{ marginTop: "0.5rem" }}>
                <img
                  src={localProducto.image}
                  alt="Vista previa"
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}
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
              placeholder="Descripción del producto"
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
