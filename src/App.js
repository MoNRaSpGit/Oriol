import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Productos from './Componentes/Productos';
import Factura from './Componentes/Factura';

function App() {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const agregarProducto = (producto) => {
    setProductosSeleccionados([...productosSeleccionados, { ...producto }]);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Productos</Link>
            <Link className="btn btn-primary" to="/factura">Ver Factura</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Productos onSeleccionarProducto={agregarProducto} />} />
          <Route path="/factura" element={<Factura productosSeleccionados={productosSeleccionados} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
