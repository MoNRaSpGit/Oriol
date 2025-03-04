import React from "react";
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const TablaProductoFactura = ({
  
  productosSeleccionados,
  handleEliminarDeFactura,
}) => {
  console.log("TablaProductoFactura => productosSeleccionados: ", productosSeleccionados);
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
        </tr>
      </thead>
      <tbody>
        {productosSeleccionados.map((producto, index) => {
          const descripcion = producto.descripcion || "Sin descripción";
          const precioNum = parseFloat(producto.precio) || 0;
          const cantidad = producto.cantidad || 0;

          // 🔹 Decide el símbolo según currency
          const simboloMoneda = producto.currency === "USD" ? "U$" : "$";

          // Cálculo del subtotal
          const subtotal = precioNum * cantidad;

          return (
            <tr key={index}>
              <td>{cantidad}</td>
              <td>{descripcion}</td>
              <td>
                {simboloMoneda}
                {precioNum.toFixed(2)}
              </td>
              <td>
                {simboloMoneda}
                {subtotal.toFixed(2)}
              </td>
              <td className="col-eliminar">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminarDeFactura(producto.codigo)}
                >
                  <FaTimes />
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
