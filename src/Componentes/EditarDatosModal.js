// src/Componentes/EditarDatosModal.jsx

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditarDatosModal = ({ show, handleClose, datosFactura, handleInputChange }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Datos del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* RUT EMISOR */}
          <Form.Group className="mb-3">
            <Form.Label>RUT Emisor</Form.Label>
            <Form.Control
              type="text"
              name="rutEmisor"
              value={datosFactura.rutEmisor}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* FECHA */}
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="text"
              name="fecha"
              value={datosFactura.fecha}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* TIPO DE PAGO (NUEVO) */}
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Pago</Form.Label>
            <Form.Select
              name="pago"
              value={datosFactura.pago}
              onChange={handleInputChange}
            >
              <option value="Contado">Contado</option>
              <option value="Crédito">Crédito</option>
            </Form.Select>
          </Form.Group>

          {/* RUT RECEPTOR */}
          <Form.Group className="mb-3">
            <Form.Label>RUT Receptor</Form.Label>
            <Form.Control
              type="text"
              name="rutReceptor"
              value={datosFactura.rutReceptor}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* NOMBRE CLIENTE */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre Cliente</Form.Label>
            <Form.Control
              type="text"
              name="nombreCliente"
              value={datosFactura.nombreCliente}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* DIRECCIÓN CLIENTE */}
          <Form.Group className="mb-3">
            <Form.Label>Dirección Cliente</Form.Label>
            <Form.Control
              type="text"
              name="direccionCliente"
              value={datosFactura.direccionCliente}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* UBICACIÓN */}
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacionCliente"
              value={datosFactura.ubicacionCliente}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarDatosModal;
