import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Css/login.css"; // Estilos del login

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Estado global de autenticación
  const { loading, error, isAuthenticated } = useSelector((state) => state.login);

  // Estado local del formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Manejo del Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("⚠️ Usuario y contraseña son obligatorios.");
      return;
    }

    // Disparamos la acción de login
    const resultAction = await dispatch(loginUser({ username, password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("✅ ¡Login exitoso!");
      navigate("/productos");
    } else {
      toast.error(resultAction.payload || "❌ Error al iniciar sesión.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="login-title">Iniciar Sesiónnnn</h2>

        <div className="form-group mb-3">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="new-username" // 🔹 Evita credenciales viejas
            spellCheck="false"
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
            autoComplete="new-password" // 🔹 Evita autocompletado de credenciales viejas
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
