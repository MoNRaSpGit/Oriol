// src/Componentes/PieFactura.js
import React from "react";

const PieFactura = ({
  totalPesos,
  totalDolares,
  finalEnDolares,
  setFinalEnDolares,
  tasaDolar,
}) => {
  // Calcula total final
  const totalFinalPesos = totalPesos + totalDolares * tasaDolar;
  const totalFinalDolares = totalDolares + totalPesos / tasaDolar;

  return (
    <div className="factura-footer">
      <div className="pie-rect">
        {/* Columna 1 */}
        <div className="pie-col">
          <div>Desarrollado por LogicLab</div>
          <div>Sistema de facturación</div>
          <div>Cel: 092945696</div>
        </div>

        {/* Columna 2 */}
        <div className="pie-col">Firma: _________________________</div>

        {/* Columna 3: Totales */}
        <div className="pie-col pie-totales">
          <div className="total-item">
            <span className="total-label">Total $:</span>
            <span className="total-value">{totalPesos.toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Dólares:</span>
            <span className="total-value">{totalDolares.toFixed(2)}</span>
          </div>

          <div
            className="total-item total-final"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => setFinalEnDolares(!finalEnDolares)}
          >
            <span className="total-label">Total:</span>
            <span className="total-value">
              {finalEnDolares
                ? `U$ ${totalFinalDolares.toFixed(2)}`
                : `$ ${totalFinalPesos.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieFactura;
