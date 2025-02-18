import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../Slice/productsSlice";
import { FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Factura.css";
import "../Css/logo.css";
import "../Css/Dueno.css";
import "../Css/Rectangulo.css";
import "../Css/Cuerpo.css";
import "../Css/Pie.css";

import logoOrio from "../Img/logoOriol2.png";

const Factura = () => {
  const dispatch = useDispatch();
  const productosSeleccionados = useSelector((state) => state.products.productosSeleccionados) || [];

  // Si no hay productos en la factura, mostramos un mensaje
  if (!productosSeleccionados.length) {
    return (
      <div className="factura-container">
        <h2 className="text-center mt-4">Factura</h2>
        <p className="text-center">No hay productos agregados a la factura.</p>
      </div>
    );
  }

  // Cálculo de Totales
  const subtotal = productosSeleccionados.reduce(
    (acc, producto) => acc + (producto.precio * producto.cantidad || 0),
    0
  );
  const ivaTotal = 0.0; // IVA fijo en 0.00
  const total = subtotal + ivaTotal;

  // Eliminar un producto solamente de la factura (no de la base de datos)
  const handleEliminarDeFactura = (codigo) => {
    dispatch(removeProduct(codigo));
  };

  return (
    <div className="factura-container">
      {/* Cabecera */}
      <div className="factura-header">
        <div className="logo-dueno-container">
          <div className="factura-logo-container">
            <img src={logoOrio} alt="Logo de la empresa" className="factura-logo" />
          </div>
          <div className="dueno">
            <div className="dueno-nombre">Oriol Ahirton Acuña</div>
            <div className="dueno-nombre">WILSON FERRERIA ALDUNATE 111</div>
            <div className="dueno-telefono">092457845</div>
          </div>
        </div>

        <div className="header-box">
          <div className="header-row header-rut">RUT EMISOR: 4587854</div>
          <div className="header-row header-efacture">e-Facture</div>

          {/* Fila combinada de títulos y valores */}
          <div className="header-multi">
            <div className="header-titles-values">
              <div className="header-col header-title">SERIE</div>
              <div className="header-col header-title">NÚMERO</div>
              <div className="header-col header-title">PAGO</div>
              <div className="header-col header-title">MONEDA</div>
            </div>
            <div className="header-titles-values">
              <div className="header-col header-value">A</div>
              <div className="header-col header-value">1458754</div>
              <div className="header-col header-value">Contado</div>
              <div className="header-col header-value">UYU</div>
            </div>
          </div>

          <div className="header-row header-receptor">RUT RECEPTOR: 154845845</div>
          <div className="header-row header-cliente">
            <div>Nombre Cliente</div>
            <div>Dirección Cliente</div>
            <div>TACUAREMBO (TACUAREMBO), URUGUAY</div>
          </div>
        </div>
      </div>

      <div className="linea-divisoria"></div>

      {/* Tabla de productos */}
      <table
        className="table table-bordered table-hover table-sm"
        style={{ margin: 0, width: "100%", textAlign: "center" }}
      >
        <thead className="thead-light">
          <tr>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>IVA</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            {/* Columna con clase "col-eliminar" para ocultar al imprimir */}
            <th className="col-eliminar">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.map((producto, index) => {
            const codigo = producto.codigo || "N/A";
            const descripcion = producto.descripcion || "Sin descripción";
            const precio = producto.precio ? parseFloat(producto.precio) : 0;
            const cantidad = producto.cantidad || 0;
            const totalProd = precio * cantidad;

            return (
              <tr key={index}>
                <td>{codigo}</td>
                <td>{cantidad}</td>
                <td>{descripcion}</td>
                <td>$0.00</td>
                <td>${precio.toFixed(2)}</td>
                <td>${totalProd.toFixed(2)}</td>
                <td className="col-eliminar">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminarDeFactura(producto.codigo)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="linea-divisoria"></div>

      {/* Pie de factura */}
      <div className="factura-footer">
        <div className="pie-rect">
          {/* Columna 1 */}
          <div className="pie-col">
            <div>Desarrollado por codeLab</div>
            <div>Desarrollo de factura</div>
            <div>Cel: 092457845</div>
          </div>

          {/* Columna 2 */}
          <div className="pie-col">Firma: _________________________</div>

          {/* Columna 3 */}
          <div className="pie-col pie-totales">
            <div className="total-item">
              <span className="total-label">Sub total:</span>
              <span className="total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-item">
              <span className="total-label">I.V.A:</span>
              <span className="total-value">$0.00</span>
            </div>
            <div className="total-item total-final">
              <span className="total-label">Total:</span>
              <span className="total-value">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factura;
