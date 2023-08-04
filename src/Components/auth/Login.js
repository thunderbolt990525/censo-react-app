import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../ApiProviders";

import "./auth.css";

const Login = () => {
  const [usuario, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usuario || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await login({
        usuario,
        password,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.apiKey);
        localStorage.setItem("idUsuario", data.id);
        navigate("/");
      } else {
        // Manejo de errores en caso de un inicio de sesión fallido
        setError("Credenciales inválidas, vuelve a intentarlo");
      }
    } catch (error) {
      console.error("Error al conectarse a la API:", error);
      setError("Error de conexión con la API");
    }
  };

  return (
    <>
      <h1 className="form-login-title">Censo 2023</h1>
      <div className="form-login">
        <h5>Login</h5>
        <input
          className="form-login-controls"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-login-controls"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button className="form-login-buttons" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <p>
          ¿No registrado? <a href="/registro">Crea una cuenta</a>
        </p>
      </div>
    </>
  );
};

export default Login;
