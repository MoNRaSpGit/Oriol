// src/App.js
import React, { useMemo, useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLeaf, FaBox, FaFileInvoice, FaPrint } from "react-icons/fa";
import Productos from "./Componentes/Productos";
import Factura from "./Componentes/Factura";
import Login from "./Componentes/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Css/App.css";

function Navbar({ mostrarNavbar }) {
  const productosSeleccionados = useSelector((state) => state.products.productosSeleccionados);
  const memoizedProductosSeleccionados = useMemo(() => productosSeleccionados, [productosSeleccionados]);

  const location = useLocation();

  const handlePrint = () => {
    document.body.classList.add("no-navbar");
    window.print();
  };

  return (
    mostrarNavbar && (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-uppercase" to="/productos">
            <FaLeaf className="me-2" /> Agro Insumos
          </Link>
          <div className="ms-auto">
            {location.pathname === "/factura" && (
              <Link className="btn btn-outline-light me-2" to="/productos">
                <FaBox className="me-1" /> Productos
              </Link>
            )}
            <Link className="btn btn-primary me-2" to="/factura">
              <FaFileInvoice className="me-2" /> Ver Factura
              <span className="badge bg-light text-dark ms-2">
                {memoizedProductosSeleccionados.length}
              </span>
            </Link>
            {location.pathname === "/factura" && (
              <button className="btn btn-success" onClick={handlePrint}>
                <FaPrint className="me-2" /> Imprimir
              </button>
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
        {/* Mostramos la navbar solo si está autenticado */}
        {isAuthenticated && <Navbar mostrarNavbar={mostrarNavbar} />}

        <Routes>
          {/* Login en la raíz "/" */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/productos"
            element={isAuthenticated ? <Productos /> : <Navigate to="/" />}
          />
          <Route
            path="/factura"
            element={isAuthenticated ? <Factura /> : <Navigate to="/" />}
          />

          {/* Si acceden a una ruta inexistente, redirigimos a "/". */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
