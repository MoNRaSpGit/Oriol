// src/Componentes/Factura.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../Slice/productsSlice";

import CabeceraFactura from "./CabeceraFactura";
import TablaProductoFactura from "./TablaProductoFactura";
import PieFactura from "./PieFactura";
import EditarDatosModal from "./EditarDatosModal"; // el modal aparte

// Estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Factura.css";
import "../Css/logo.css";
import "../Css/Dueno.css";
import "../Css/Rectangulo.css";
import "../Css/Cuerpo.css";
import "../Css/Pie.css";

const Factura = () => {
  const dispatch = useDispatch();

  // Tomamos la cotización del dólar (si la tienes en Redux) o un useState local:
  const tasaDolar = useSelector((state) => state.config.tasaDolar);

  // Productos de la factura
  const productosSeleccionados = useSelector(
    (state) => state.products.productosSeleccionados
  ) || [];

  // Datos del rectángulo
  const [datosFactura, setDatosFactura] = useState({
    rutEmisor: "4587854",
    eFacture: "e-Factura",
    serie: "A",
    fecha: "20/02/2025",
    pago: "Contado",
    moneda: "UYU",
    rutReceptor: "No corresponde",
    nombreCliente: "Cliente final",
    direccionCliente: "No corresponde",
    ubicacionCliente: "TACUAREMBO (TACUAREMBO), URUGUAY",
  });

  // Modal de edición
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Toggle final en rojo
  const [finalEnDolares, setFinalEnDolares] = useState(false);

  // Actualizar datos del modal
  const handleInputChange = (e) => {
    setDatosFactura({ ...datosFactura, [e.target.name]: e.target.value });
  };

  // Control de monedas en la tabla
  const [productosEnDolares, setProductosEnDolares] = useState({});
  const toggleMoneda = (codigo) => {
    setProductosEnDolares((prev) => ({
      ...prev,
      [codigo]: !prev[codigo],
    }));
  };

  // Mensaje si no hay productos
  if (!productosSeleccionados.length) {
    return (
      <div className="factura-container">
        <h2 className="text-center mt-4">Factura</h2>
        <p className="text-center">No hay productos agregados a la factura.</p>
      </div>
    );
  }

  // Eliminar producto de la factura
  const handleEliminarDeFactura = (codigo) => {
    dispatch(removeProduct(codigo));
  };

  // Cálculos de totales (pesos / dólares)
  const { totalPesos, totalDolares } = productosSeleccionados.reduce(
    (acc, producto) => {
      const codigo = producto.codigo || "N/A";
      const precioUYU = producto.precio ? parseFloat(producto.precio) : 0;
      const cantidad = producto.cantidad || 0;
      const enDolares = productosEnDolares[codigo];

      if (enDolares) {
        acc.totalDolares += (precioUYU * cantidad) / tasaDolar;
      } else {
        acc.totalPesos += precioUYU * cantidad;
      }
      return acc;
    },
    { totalPesos: 0, totalDolares: 0 }
  );

  return (
    <div className="factura-container">
      {/* Cabecera */}
      <CabeceraFactura
        datosFactura={datosFactura}
        handleShowModal={handleShowModal}
      />

      <div className="linea-divisoria"></div>

      {/* Tabla */}
      <TablaProductoFactura
        productosSeleccionados={productosSeleccionados}
        productosEnDolares={productosEnDolares}
        tasaDolar={tasaDolar}
        handleEliminarDeFactura={handleEliminarDeFactura}
        toggleMoneda={toggleMoneda}
      />

      <div className="linea-divisoria"></div>

      {/* Pie */}
      <PieFactura
        totalPesos={totalPesos}
        totalDolares={totalDolares}
        finalEnDolares={finalEnDolares}
        setFinalEnDolares={setFinalEnDolares}
        tasaDolar={tasaDolar}
      />

      {/* MODAL para editar datos */}
      <EditarDatosModal
        show={showModal}
        handleClose={handleCloseModal}
        datosFactura={datosFactura}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default Factura;
