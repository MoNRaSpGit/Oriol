import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../Slice/productsSlice";

import CabeceraFactura from "./CabeceraFactura";
import TablaProductoFactura from "./TablaProductoFactura";
import PieFactura from "./PieFactura";
import EditarDatosModal from "./EditarDatosModal"; // Modal aparte

// Estilos (ajusta según tu proyecto)
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Factura.css";
import "../Css/logo.css";
import "../Css/Dueno.css";
import "../Css/Rectangulo.css";
import "../Css/Cuerpo.css";
import "../Css/Pie.css";

const Factura = () => {
  const dispatch = useDispatch();

  // 1) Obtener la fecha actual dinámica (formato DD/MM/YYYY)
  const obtenerFechaActual = () => {
    return new Date().toLocaleDateString("es-UY", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // 2) Tomamos la cotización del dólar (si la tienes en Redux):
  const tasaDolar = useSelector((state) => state.config.tasaDolar) || 40;

  // 3) Productos de la factura
  const productosSeleccionados = useSelector(
    (state) => state.products.productosSeleccionados
  ) || [];

  // 4) Controlar toggle para mostrar el total final en dólares o en pesos
  const [finalEnDolares, setFinalEnDolares] = useState(false);

  // 5) Datos de la cabecera de la factura
  const [datosFactura, setDatosFactura] = useState({
    rutEmisor: "",
    eFacture: "e-Factura",
    serie: "A",
    fecha: obtenerFechaActual(), // Fecha dinámica
    pago: "Contado",
    moneda: "UYU",
    rutReceptor: "",
    nombreCliente: "Cliente final",
    direccionCliente: "",
    ubicacionCliente: "TACUAREMBO (TACUAREMBO), URUGUAY",
  });

  // 6) Modal (para editar datos de cabecera)
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Actualizar datos del modal
  const handleInputChange = (e) => {
    setDatosFactura({ ...datosFactura, [e.target.name]: e.target.value });
  };

  // Si no hay productos, mostramos un mensaje
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

  // 7) Calcular totales en pesos y dólares (sin conversión)
  let totalPesos = 0;
  let totalDolares = 0;

  productosSeleccionados.forEach((producto) => {
    const precioNum = parseFloat(producto.precio) || 0;
    const cantidad = producto.cantidad || 0;

    // Si el producto está en USD, lo sumamos a totalDolares
    // Si está en UYU (o no existe currency), lo sumamos a totalPesos
    if (producto.currency === "USD") {
      totalDolares += precioNum * cantidad;
    } else {
      totalPesos += precioNum * cantidad;
    }
  });

  return (
    <div className="factura-container">
      {/* Cabecera */}
      <CabeceraFactura
        datosFactura={datosFactura}
        finalEnDolares={finalEnDolares}
        handleShowModal={handleShowModal}
      />

      <div className="linea-divisoria"></div>

      {/* Tabla */}
      <TablaProductoFactura
        productosSeleccionados={productosSeleccionados}
        handleEliminarDeFactura={handleEliminarDeFactura}
      />

      <div className="linea-divisoria"></div>

      {/* Pie con el toggle para el total final */}
      <PieFactura
        totalPesos={totalPesos}
        totalDolares={totalDolares}
        finalEnDolares={finalEnDolares}
        setFinalEnDolares={setFinalEnDolares}
        tasaDolar={tasaDolar}
      />

      {/* Modal para editar datos de la factura */}
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
