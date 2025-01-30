// src/Componentes/Factura.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Factura.css';
import logoOrio from '../Img/logoOriol.jpg'; // Importa la imagen

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
            {/* Header de la Factura */}
            <div className="factura-header d-flex">
                <img src={logoOrio} alt="Logo Oriol" className="factura-logo" /> {/* Usa la imagen */}
                <div className="factura-info">
                    {/* Primera fila: Cliente */}
                    <div className="factura-info-box">
                        <div className="titulo">Cliente</div>
                        <div className="valor">Nombre: Consumidor Final</div>
                        <div className="linea-divisoria"></div>                     
                    </div>
                    {/* Segunda fila: RUT y Fecha */}
                    <div className="factura-info-row">
                        <div className="factura-info-box">
                            <div className="titulo">RUT</div>
                            <div className="valor">12.345.678-9</div>
                        </div>
                        <div className="factura-info-box">
                            <div className="titulo">Fecha</div>
                            <div className="valor">{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cuerpo de la Factura */}
            <div className="factura-body">
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
            </div>

            {/* Pie de la Factura */}

            <div className="factura-footer">
                {/* Pie de Página 2 dividido en dos secciones */}
                <div className="factura-footer-left">
                    <div className="footer-info">
                        Desarrollado por: LogicLab <br />
                        Sistemas de gestión de facturación <br />
                        Software de comprobantes comerciales <br />
                        Ubicación: Tacuarembó <br />
                        WhatsApp: 092945696
                    </div>
                    <div className="footer-sign">
                        Firma: ______________________________
                    </div>
                </div>

                {/* Caja de Totales */}
                <div className="factura-total-box">
                    <p><span>Subtotal:</span> <span>${subtotal}</span></p>
                    <p><span>IVA:</span> <span>${iva}</span></p>
                    <p><strong>Total:</strong> <strong>${total}</strong></p>
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handlePrint}>Imprimir Factura</button>
            </div>
        </div>
    );
};

export default Factura;