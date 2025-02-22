// src/Componentes/TablaProductoFactura.js
import React from "react";
import { FaTimes, FaDollarSign } from "react-icons/fa";
import { Button } from "react-bootstrap";

const TablaProductoFactura = ({
  productosSeleccionados,
  productosEnDolares,
  tasaDolar,
  handleEliminarDeFactura,
  toggleMoneda,
}) => {
  return (
    <table
      className="table table-bordered table-hover table-sm"
      style={{ margin: 0, width: "100%", textAlign: "center" }}
    >
      <thead className="thead-light">
        <tr>
          <th>Cantidad</th>
          <th>Descripción</th>
          <th>Precio Unitario</th>
          <th>Total</th>
          <th className="col-eliminar">Eliminar</th>
          <th className="col-convertir">Convertir</th>
        </tr>
      </thead>
      <tbody>
        {productosSeleccionados.map((producto, index) => {
          const codigo = producto.codigo || "N/A";
          const descripcion = producto.descripcion || "Sin descripción";
          const precioUYU = producto.precio ? parseFloat(producto.precio) : 0;
          const cantidad = producto.cantidad || 0;
          const enDolares = productosEnDolares[codigo];

          // Cálculos de precio unitario y total
          const precioMostrar = enDolares
            ? (precioUYU / tasaDolar).toFixed(2)
            : precioUYU.toFixed(2);

          const totalProd = enDolares
            ? ((precioUYU * cantidad) / tasaDolar).toFixed(2)
            : (precioUYU * cantidad).toFixed(2);

          return (
            <tr key={index}>
              <td>{cantidad}</td>
              <td>{descripcion}</td>
              <td>
                {enDolares ? `U$ ${precioMostrar}` : `$ ${precioMostrar}`}
              </td>
              <td>
                {enDolares ? `U$ ${totalProd}` : `$ ${totalProd}`}
              </td>
              <td className="col-eliminar">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminarDeFactura(codigo)}
                >
                  <FaTimes />
                </button>
              </td>
              <td className="col-convertir">
                <Button
                  className="btn btn-info btn-sm"
                  onClick={() => toggleMoneda(codigo)}
                >
                  <FaDollarSign />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablaProductoFactura;
