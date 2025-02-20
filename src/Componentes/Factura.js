import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../Slice/productsSlice";
import { FaTimes } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Factura.css";
import "../Css/logo.css";
import "../Css/Dueno.css";
import "../Css/Rectangulo.css";
import "../Css/Cuerpo.css";
import "../Css/Pie.css";

import logoOrio from "../Img/logoOriol2.png";

const Factura = () => {
  const dispatch = useDispatch();
  const productosSeleccionados = useSelector(
    (state) => state.products.productosSeleccionados
  ) || [];

  // 1) Estado para datos del rectángulo (valores predeterminados).
  //    Cambiamos "numero" por "fecha" con valor inicial "20/02/2025".
  const [datosFactura, setDatosFactura] = useState({
    rutEmisor: "4587854",
    eFacture: "e-Factura", // NO editable
    serie: "A", // NO editable
    fecha: "20/02/2025", // Editable
    pago: "Contado", // NO editable
    moneda: "UYU", // NO editable

    rutReceptor: "No corresponde",
    nombreCliente: "Cliente final",
    direccionCliente: "No corresponde",
    ubicacionCliente: "TACUAREMBO (TACUAREMBO), URUGUAY",
  });

  // 2) Estado para controlar apertura/cierre del modal
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // 3) Manejar cambios en los inputs del modal
  const handleInputChange = (e) => {
    setDatosFactura({
      ...datosFactura,
      [e.target.name]: e.target.value,
    });
  };

  // 4) Si no hay productos, mostramos un mensaje simple
  if (!productosSeleccionados.length) {
    return (
      <div className="factura-container">
        <h2 className="text-center mt-4">Factura</h2>
        <p className="text-center">No hay productos agregados a la factura.</p>
      </div>
    );
  }

  // 5) Cálculo de Totales
  const subtotal = productosSeleccionados.reduce(
    (acc, producto) => acc + (producto.precio * producto.cantidad || 0),
    0
  );
  const ivaTotal = 0.0; // IVA fijo en 0.00
  const total = subtotal + ivaTotal;

  // 6) Eliminar un producto de la factura (no de la base de datos)
  const handleEliminarDeFactura = (codigo) => {
    dispatch(removeProduct(codigo));
  };

  return (
    <div className="factura-container">
      {/* Cabecera */}
      <div className="factura-header">
        <div className="logo-dueno-container">
          <div className="factura-logo-container">
            <img
              src={logoOrio}
              alt="Logo de la empresa"
              className="factura-logo"
            />
          </div>
          <div className="dueno">
            <div className="dueno-nombre">Oriol Ahirton Acuña</div>
            <div className="dueno-nombre">WILSON FERRERIA ALDUNATE 111</div>
            <div className="dueno-telefono">092457845</div>
          </div>
        </div>

        {/* 
          RECTÁNGULO DE INFORMACIÓN
          Ahora es clickeable para abrir el modal y editar datos
        */}
        <div
          className="header-box"
          style={{ cursor: "pointer" }}
          onClick={handleShowModal}
        >
          {/* RUT Emisor */}
          <div className="header-row header-rut">
            RUT EMISOR: {datosFactura.rutEmisor}
          </div>

          {/* e-Facture (no editable) */}
          <div className="header-row header-efacture">
            {datosFactura.eFacture}
          </div>

          {/* Fila combinada: SERIE, FECHA, PAGO, MONEDA */}
          <div className="header-multi">
            <div className="header-titles-values">
              <div className="header-col header-title">SERIE</div>
              <div className="header-col header-title">FECHA</div>
              <div className="header-col header-title">PAGO</div>
              <div className="header-col header-title">MONEDA</div>
            </div>
            <div className="header-titles-values">
              <div className="header-col header-value">{datosFactura.serie}</div>
              <div className="header-col header-value">{datosFactura.fecha}</div>
              <div className="header-col header-value">{datosFactura.pago}</div>
              <div className="header-col header-value">
                {datosFactura.moneda}
              </div>
            </div>
          </div>

          {/* RUT Receptor */}
          <div className="header-row header-receptor">
            RUT RECEPTOR: {datosFactura.rutReceptor}
          </div>

          {/* Mostrar "Nombre Cliente:" y "Dirección:" */}
          <div className="header-row header-cliente">
            <div>Nombre Cliente: {datosFactura.nombreCliente}</div>
            <div>Dirección: {datosFactura.direccionCliente}</div>
            <div>{datosFactura.ubicacionCliente}</div>
          </div>
        </div>
      </div>

      <div className="linea-divisoria"></div>

      {/* Tabla de productos */}
      <table
        className="table table-bordered table-hover table-sm"
        style={{ margin: 0, width: "100%", textAlign: "center" }}
      >
        <thead className="thead-light">
          <tr>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>IVA</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            {/* Columna con clase "col-eliminar" para ocultar al imprimir */}
            <th className="col-eliminar">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.map((producto, index) => {
            const codigo = producto.codigo || "N/A";
            const descripcion = producto.descripcion || "Sin descripción";
            const precio = producto.precio ? parseFloat(producto.precio) : 0;
            const cantidad = producto.cantidad || 0;
            const totalProd = precio * cantidad;

            return (
              <tr key={index}>
                <td>{codigo}</td>
                <td>{cantidad}</td>
                <td>{descripcion}</td>
                <td>$0.00</td>
                <td>${precio.toFixed(2)}</td>
                <td>${totalProd.toFixed(2)}</td>
                <td className="col-eliminar">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminarDeFactura(producto.codigo)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="linea-divisoria"></div>

      {/* Pie de factura */}
      <div className="factura-footer">
        <div className="pie-rect">
          {/* Columna 1 */}
          <div className="pie-col">
            <div>Desarrollado por LogicLab</div>
            <div>Sistema de facturación</div>
            <div>Cel: 092945696</div>
          </div>

          {/* Columna 2 */}
          <div className="pie-col">Firma: _________________________</div>

          {/* Columna 3 */}
          <div className="pie-col pie-totales">
            <div className="total-item">
              <span className="total-label">Sub total:</span>
              <span className="total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-item">
              <span className="total-label">I.V.A:</span>
              <span className="total-value">$0.00</span>
            </div>
            <div className="total-item total-final">
              <span className="total-label">Total:</span>
              <span className="total-value">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PARA EDITAR DATOS DEL "RECTÁNGULO" */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
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

            {/* FECHA (en vez de número) */}
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                name="fecha"
                value={datosFactura.fecha}
                onChange={handleInputChange}
              />
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Factura;
