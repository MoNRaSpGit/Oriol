import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Factura.css';
import logoOrio from '../Img/logoOriol2.png';

const Factura = ({ productosSeleccionados }) => {
    return (
        <div className="factura-container">
            {/* Cabecera con logo y rectángulo */}
            <div className="factura-header">
                {/* Logo de la empresa */}
               { <div className="factura-logo-container">
                    <img src={logoOrio} alt="Logo de la empresa" className="factura-logo" />
                </div>}

                {/* Rectángulo con la información */}
                <div className="header-box">
                    <div className="header-row header-rut">RUT EMISOR: 4587854</div>
                    <div className="header-row header-efacture">e-Facture</div>
                    
                    {/* Fila 3 con 4 columnas (Títulos en gris) */}
                    <div className="header-row header-multi header-titles">
                        <div className="header-col">SERIE</div>
                        <div className="header-col">NÚMERO</div>
                        <div className="header-col">PAGO</div>
                        <div className="header-col">MONEDA</div>
                    </div>

                    {/* Fila 4 con 4 columnas (Valores sin fondo gris) */}
                    <div className="header-row header-multi">
                        <div className="header-col">A</div>
                        <div className="header-col">1458754</div>
                        <div className="header-col">Contado</div>
                        <div className="header-col">UYU</div>
                    </div>

                    {/* Fila 5 - RUT RECEPTOR con fondo gris */}
                    <div className="header-row header-receptor">RUT RECEPTOR: 154845845</div>

                    {/* Fila 6 - Información del Cliente con fondo blanco */}
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



/* Version perefecta -->  xt9 */