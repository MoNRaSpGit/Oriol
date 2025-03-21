// src/App.js
import React, { useMemo, useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaLeaf, FaBox, FaFileInvoice, FaPrint } from "react-icons/fa";
import Productos from "./Componentes/Productos";
import Factura from "./Componentes/Factura";
import Login from "./Componentes/Login";
import CuentaCorriente from "./Componentes/CuentaCorriente";

import { setTasaDolar } from "../src/Slice/configSlice"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Css/App.css";

function Navbar({ mostrarNavbar }) {
  const dispatch = useDispatch();
  const productosSeleccionados = useSelector((state) => state.products.productosSeleccionados);
  const memoizedProductosSeleccionados = useMemo(() => productosSeleccionados, [productosSeleccionados]);

  // Leemos la tasa actual por si queremos mostrarla en el input
  const tasaDolar = useSelector((state) => state.config.tasaDolar);

  const [mostrarCotizacion, setMostrarCotizacion] = useState(false);

  const location = useLocation();

  const handlePrint = () => {
    document.body.classList.add("no-navbar");
    window.print();
  };

  // Función para actualizar la tasa
  const handleChangeTasa = (e) => {
    const valor = parseFloat(e.target.value);
    dispatch(setTasaDolar(isNaN(valor) ? 0 : valor));
  };

  return (
    mostrarNavbar && (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-uppercase" to="/productos">
            <FaLeaf className="me-2" /> Agro Insumos
          </Link>

          <div className="ms-auto d-flex align-items-center">
            {location.pathname === "/factura" && (
              <>
                <Link className="btn btn-outline-light me-2" to="/productos">
                  <FaBox className="me-1" /> Productos
                </Link>
                <button className="btn btn-success me-2" onClick={handlePrint}>
                  <FaPrint className="me-2" /> Imprimir
                </button>

                {/* Botón para mostrar/ocultar el input de cotización */}
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setMostrarCotizacion(!mostrarCotizacion)}
                >
                  Cotización
                </button>

                {/* Input para cambiar la tasa, se muestra si mostrarCotizacion = true */}
                {mostrarCotizacion && (
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "80px" }}
                    value={tasaDolar}
                    onChange={handleChangeTasa}
                  />
                )}
              </>
            )}

            {/* 🔹 SOLO se muestra si estamos en /productos */}
            {location.pathname === "/productos" && (
              <>
                <Link className="btn btn-primary me-2" to="/factura">
                  <FaFileInvoice className="me-2" /> Ver Factura
                  <span className="badge bg-light text-dark ms-2">
                    {memoizedProductosSeleccionados.length}
                  </span>
                </Link>

                {/* Botón Cuenta Corriente aquí */}
                <Link className="btn btn-secondary" to="/cuenta-corriente">
                  Cuenta Corriente
                </Link>
              </>

            )}
          </div>
        </div>
      </nav>
    )
  );
}


function App() {
  const [mostrarNavbar, setMostrarNavbar] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.login);

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove("no-navbar");
      setMostrarNavbar(true);
    };
    window.onafterprint = handleAfterPrint;
    return () => {
      window.onafterprint = null;
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar mostrarNavbar={mostrarNavbar} />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/productos"
            element={isAuthenticated ? <Productos /> : <Navigate to="/" />}
          />
          <Route
            path="/factura"
            element={isAuthenticated ? <Factura /> : <Navigate to="/" />}
          />

          {/* NUEVA RUTA */}
          <Route
            path="/cuenta-corriente"
            element={
              isAuthenticated ? <CuentaCorriente /> : <Navigate to="/" />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
