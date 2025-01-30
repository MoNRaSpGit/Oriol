// src/Componentes/Productos.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Productos.css';

const productos = [
  { id: 1, nombre: 'Semilla para Animales', descripcion: 'Alimento nutritivo para el ganado.', precio: 1500 },
  { id: 2, nombre: 'Comida para Gato', descripcion: 'Alimento balanceado para gatos.', precio: 1200 },
  { id: 3, nombre: 'Comida para Perro', descripcion: 'Croquetas de alta calidad para perros.', precio: 1300 },
  { id: 4, nombre: 'Máquina Fumigadora', descripcion: 'Herramienta para fumigar cultivos.', precio: 35000 },
  { id: 5, nombre: 'Fertilizante Orgánico', descripcion: 'Mejora el crecimiento de las plantas.', precio: 5000 },
  { id: 6, nombre: 'Insecticida Agrícola', descripcion: 'Protege los cultivos de plagas.', precio: 2800 }
];

const Productos = ({ onSeleccionarProducto }) => {
  return (
    <div className="container">
      <h2 className="text-center my-4">Agroinsumo Productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="image-placeholder mb-3"></div>
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text fw-bold">${producto.precio}</p>
                <button className="btn btn-primary" onClick={() => onSeleccionarProducto(producto)}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
