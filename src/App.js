import React, { useMemo } from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "./Slice/productsSlice";
import Productos from "./Componentes/Productos";
import Factura from "./Componentes/Factura";



function App() {
  const dispatch = useDispatch();

  // 🔹 Memoiza el resultado para evitar renders innecesarios
  const productosSeleccionados = useSelector((state) => state.products.productosSeleccionados);
  const memoizedProductosSeleccionados = useMemo(() => productosSeleccionados, [productosSeleccionados]);

  const agregarProducto = (producto) => {
    dispatch(addProduct(producto));
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Productos</Link>
            <Link className="btn btn-primary" to="/factura">
              Ver Factura ({memoizedProductosSeleccionados.length})
            </Link>
         
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Productos onSeleccionarProducto={agregarProducto} />} />
          <Route path="/factura" element={<Factura productosSeleccionados={memoizedProductosSeleccionados} />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
