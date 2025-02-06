import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Factura.css';  // Contenedor principal
import '../Css/logo.css';      // Logo
import '../Css/Dueno.css';     // Dueño
import '../Css/Rectangulo.css'; // Rectángulo de información

import logoOrio from '../Img/logoOriol2.png';

const Factura = ({ productosSeleccionados }) => {
    return (
        <div className="factura-container">
            {/* Cabecera con logo, caja del dueño y rectángulo de información */}
            <div className="factura-header">

                {/* Contenedor de logo y dueño agrupados a la izquierda */}
                <div className="logo-dueno-container">
                    {/* Contenedor del logo */}
                    <div className="factura-logo-container">
                        <img src={logoOrio} alt="Logo de la empresa" className="factura-logo" />
                    </div>

                    {/* Caja "Dueño" - Rectángulo independiente debajo del logo */}
                    <div className="dueno">
                        <div className="dueno-nombre">Oriol Ahirton Acuña</div>
                        <div className="dueno-nombre">WILSON FERRERIA ALDUNATE 111</div>
                        <div className="dueno-telefono">092457845</div>
                    </div>
                </div>

                {/* Rectángulo con la información alineado a la derecha */}
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

            {/* Cuerpo */}
            <div className="factura-body">
                <h3>Cuerpo</h3>
            </div>

            <div className="linea-divisoria"></div>

            {/* Pie de página */}
            <div className="factura-footer">
                <h3>Pie de página</h3>
            </div>
        </div>
    );
};

export default Factura;
