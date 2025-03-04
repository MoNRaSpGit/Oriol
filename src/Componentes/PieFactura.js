// src/Componentes/PieFactura.js
import React from "react";

const PieFactura = ({
  totalPesos,
  totalDolares,
  finalEnDolares,
  setFinalEnDolares,
  tasaDolar,
}) => {
  // Asegurarnos de que sean números
  const pesosNum = parseFloat(totalPesos) || 0;
  const dolaresNum = parseFloat(totalDolares) || 0;
  const tasaNum = parseFloat(tasaDolar) || 1;

  // Calcula total final: todo en pesos o todo en dólares
  const totalFinalPesos = pesosNum + dolaresNum * tasaNum;
  const totalFinalDolares = dolaresNum + pesosNum / tasaNum;

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
            <span className="total-value">{pesosNum.toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Dólares:</span>
            <span className="total-value">{dolaresNum.toFixed(2)}</span>
          </div>

          {/* Total final con toggle */}
          <div
            className="total-item total-final"
            style={{ color: "darkred", cursor: "pointer" }}
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
