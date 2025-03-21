// src/Componentes/CuentaCorriente.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProveedor,
  updateProveedor,
  deleteProveedor,
} from "../Slice/proveedoresSlice";
import { Button } from "react-bootstrap";
import ModalProveedor from "./ModalProveedor";
import { toast } from "react-toastify";
import "../Css/Productos.css"; // O tu CSS, si gustas

const CuentaCorriente = () => {
  const dispatch = useDispatch();
  const { proveedores } = useSelector((state) => state.proveedores);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  // Búsqueda por nombre
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrado simple por nombre
  const filteredProveedores = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal en modo NUEVO
  const handleAgregar = () => {
    setIsEditMode(false);
    setProveedorSeleccionado(null);
    setShowModal(true);
  };

  // Abrir modal en modo EDICIÓN
  const handleEditar = (proveedor) => {
    setIsEditMode(true);
    setProveedorSeleccionado(proveedor);
    setShowModal(true);
  };

  // Eliminar
  const handleEliminar = (id) => {
    if (window.confirm("¿Deseas eliminar este proveedor?")) {
      dispatch(deleteProveedor(id));
      toast.info("Proveedor eliminado");
    }
  };

  // Guardar (crear o actualizar) se llama desde el modal
  const handleSave = (datosProveedor) => {
    // Validación mínima
    if (!datosProveedor.nombre.trim()) {
      toast.error("El nombre es requerido");
      return;
    }
    if (isNaN(datosProveedor.deuda)) {
      toast.error("La deuda debe ser un número");
      return;
    }

    if (isEditMode && proveedorSeleccionado) {
      // Modo edición
      dispatch(
        updateProveedor({
          id: proveedorSeleccionado.id,
          ...datosProveedor,
        })
      );
      toast.success("Proveedor actualizado");
    } else {
      // Modo creación
      dispatch(addProveedor(datosProveedor));
      toast.success("Proveedor agregado");
    }

    setShowModal(false);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Cuenta Corriente - Proveedores</h2>

      {/* Botón agregar */}
      <div className="text-center mb-3">
        <Button variant="primary" onClick={handleAgregar}>
          ➕ Agregar Proveedor
        </Button>
      </div>

      {/* Búsqueda */}
      <div className="text-center mb-4">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla de proveedores */}
      {filteredProveedores.length === 0 ? (
        <p className="text-center">No hay proveedores</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Deuda</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProveedores.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.deuda}</td>
                <td>{p.descripcion}</td>
                <td>{p.fecha}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditar(p)}
                  >
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleEliminar(p.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para agregar/editar */}
      <ModalProveedor
        show={showModal}
        onHide={() => setShowModal(false)}
        isEditMode={isEditMode}
        proveedorInicial={proveedorSeleccionado || {}}
        onSave={handleSave}
      />
    </div>
  );
};

export default CuentaCorriente;
