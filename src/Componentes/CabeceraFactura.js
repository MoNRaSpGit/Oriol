// src/Componentes/CabeceraFactura.js
import React from "react";
import logoOrio from "../Img/logoOriol2.png";

const CabeceraFactura = ({ datosFactura, handleShowModal }) => {
  return (
    <div className="factura-header">
      <div className="logo-dueno-container">
        <div className="factura-logo-container">
          <img
            src={logoOrio}
            alt="Logo de la empresa"
            className="factura-logo"
          />
        </div>
        <div className="dueno">
          <div className="dueno-nombre"></div>
          <div className="dueno-nombre">WILSON FERREIRA Y OLIMPIA PINTOS</div>
          <div className="dueno-telefono">46329790 - 098796127</div>
        </div>
      </div>

      <div
        className="header-box"
        style={{ cursor: "pointer" }}
        onClick={handleShowModal}
      >
        <div className="header-row header-rut">
          RUT EMISOR: {datosFactura.rutEmisor}
        </div>
        <div className="header-row header-efacture">
          {datosFactura.eFacture}
        </div>
        <div className="header-multi">
          <div className="header-titles-values">
            <div className="header-col header-title">SERIE</div>
            <div className="header-col header-title">FECHA</div>
            <div className="header-col header-title">PAGO</div>
            <div className="header-col header-title">MONEDA</div>
          </div>
          <div className="header-titles-values">
            <div className="header-col header-value">{datosFactura.serie}</div>
            <div className="header-col header-value">{datosFactura.fecha}</div>
            <div className="header-col header-value">{datosFactura.pago}</div>
            <div className="header-col header-value">
              {datosFactura.moneda}
            </div>
          </div>
        </div>
        <div className="header-row header-receptor">
          RUT RECEPTOR: {datosFactura.rutReceptor}
        </div>
        <div className="header-row header-cliente">
          <div>Nombre Cliente: {datosFactura.nombreCliente}</div>
          <div>Dirección: {datosFactura.direccionCliente}</div>
          <div>{datosFactura.ubicacionCliente}</div>
        </div>
      </div>
    </div>
  );
};

export default CabeceraFactura;
