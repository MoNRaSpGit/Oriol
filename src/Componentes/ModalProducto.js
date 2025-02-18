import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalProducto = ({ show, onHide, producto, onChange, onSave, isEditMode }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={producto.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={producto.price}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={producto.image}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={producto.description}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="success" onClick={onSave}>
          {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProducto;
