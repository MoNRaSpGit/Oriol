// src/Componentes/Productos.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Productos.css';

const productos = [
  { id: 1, nombre: 'Semilla para Animales', descripcion: 'Alimento nutritivo para el ganado.', precio: 1500, imagen: 'semilla.jpg' },
  { id: 2, nombre: 'Comida para Gato', descripcion: 'Alimento balanceado para gatos.', precio: 1200, imagen: 'Monelo.jpg' },
  { id: 3, nombre: 'Comida para Perro', descripcion: 'Croquetas de alta calidad para perros.', precio: 1300, imagen: 'dog.jpg' },
  { id: 4, nombre: 'Máquina Fumigadora', descripcion: 'Herramienta para fumigar cultivos.', precio: 35000, imagen: 'fumi2.jpg' },
  { id: 5, nombre: 'Fertilizante Orgánico', descripcion: 'Mejora el crecimiento de las plantas.', precio: 5000, imagen: 'abono_organico.jpg' },
  { id: 6, nombre: 'Insecticida Agrícola', descripcion: 'Protege los cultivos de plagas.', precio: 2800, imagen: 'insecticida.jpg' }
];

const Productos = ({ onSeleccionarProducto }) => {
  return (
    <div className="container">
      <h2 className="text-center my-4">Agro insumos Productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img 
                src={require(`../Img/${producto.imagen}`)} 
                alt={producto.nombre} 
                className="card-img-top img-fluid product-image" 
              />
              <div className="card-body text-center">
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
