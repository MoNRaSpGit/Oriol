import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Css/login.css"; // Tu CSS de login con estilos

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obtenemos del estado global si hay error, si está cargando, etc.
  const { loading, error, isAuthenticated } = useSelector((state) => state.login);

  // Campos del formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Manejar Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Disparamos la acción asíncrona
    const resultAction = await dispatch(loginUser({ username, password }));
    
    // Si el login fue exitoso (fulfilled), redirigimos a "/productos"
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("¡Login exitoso!");
      navigate("/productos"); // Redirige a Productos
    } else {
      // Si fue rejected, el error está en "error" del slice
      toast.error(error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        <div className="form-group mb-3">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Mostrar error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Verificando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
