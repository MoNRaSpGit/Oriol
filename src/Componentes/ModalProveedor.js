// src/Componentes/ModalProveedor.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalProveedor = ({
  show,
  onHide,
  isEditMode,
  proveedorInicial,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    nombre: proveedorInicial.nombre || "",
    deuda: proveedorInicial.deuda || 0,
    descripcion: proveedorInicial.descripcion || "",
    fecha: proveedorInicial.fecha || "",
  });

  // Actualiza campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar
  const handleGuardar = () => {
    onSave(formData);
  };

  // Cada vez que se abra el modal en modo edición, recargamos el estado:
  React.useEffect(() => {
    setFormData({
      nombre: proveedorInicial.nombre || "",
      deuda: proveedorInicial.deuda || 0,
      descripcion: proveedorInicial.descripcion || "",
      fecha: proveedorInicial.fecha || "",
    });
  }, [proveedorInicial]);

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Editar" : "Agregar"} Proveedor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="deuda" className="mb-3">
            <Form.Label>Deuda</Form.Label>
            <Form.Control
              type="number"
              name="deuda"
              value={formData.deuda}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="descripcion" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="fecha" className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProveedor;
