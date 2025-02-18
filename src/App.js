import React, { useMemo, useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLeaf, FaBox, FaFileInvoice, FaPrint } from "react-icons/fa"; // ✅ Hoja en título y caja en Productos
import Productos from "./Componentes/Productos";
import Factura from "./Componentes/Factura";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Css/App.css";

function Navbar({ mostrarNavbar }) {
  const productosSeleccionados = useSelector((state) => state.products.productosSeleccionados);
  const memoizedProductosSeleccionados = useMemo(() => productosSeleccionados, [productosSeleccionados]);

  const location = useLocation();

  // ✅ Función para imprimir
  const handlePrint = () => {
    document.body.classList.add("no-navbar"); // Ocultar navbar y elementos no imprimibles
    window.print();
  };

  return (
    mostrarNavbar && (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            <FaLeaf className="me-2" /> Agro Insumos {/* ✅ Dejamos la hoja 🌿 en el título */}
          </Link>
          <div className="ms-auto">
            {location.pathname === "/factura" && (
              <Link className="btn btn-outline-light me-2" to="/">
                <FaBox className="me-1" /> Productos {/* ✅ Solo aparece en Factura con caja 📦 */}
              </Link>
            )}
            <Link className="btn btn-primary me-2" to="/factura">
              <FaFileInvoice className="me-2" /> Ver Factura 
              <span className="badge bg-light text-dark ms-2">{memoizedProductosSeleccionados.length}</span>
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

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove("no-navbar"); // ✅ Restauramos la navbar tras la impresión
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
        <Navbar mostrarNavbar={mostrarNavbar} />
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/factura" element={<Factura />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} /> {/* Notificaciones */}
      </div>
    </Router>
  );
}

export default App;
