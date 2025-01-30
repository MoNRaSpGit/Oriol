// src/Componentes/Factura.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Factura.css';

const Factura = ({ productosSeleccionados }) => {
  const generarCodigo = () => Math.floor(10000 + Math.random() * 90000);

  const calcularSubtotal = () => {
    return productosSeleccionados.reduce((acc, producto) => {
      return acc + producto.precio;
    }, 0);
  };

  const subtotal = calcularSubtotal();
  const iva = 0;
  const total = subtotal + iva;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container factura-container print-a4">
      <h2 className="text-center my-4">Factura</h2>
      <div className="factura-info">
        <p><strong>RUT:</strong> 12.345.678-9</p>
        <p><strong>Nombre del Cliente:</strong> Juan Pérez</p>
        <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>IVA</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.map((producto) => (
            <tr key={producto.id}>
              <td>{generarCodigo()}</td>
              <td>1</td>
              <td>{producto.nombre}</td>
              <td>${iva}</td>
              <td>${producto.precio}</td>
              <td>${producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end factura-totales">
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>IVA:</strong> ${iva}</p>
        <p><strong>Total:</strong> ${total}</p>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handlePrint}>Imprimir Factura</button>
      </div>
    </div>
  );
};

export default Factura;
