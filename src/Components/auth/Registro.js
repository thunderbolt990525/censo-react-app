import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registro, login } from "../ApiProviders";

import "./auth.css";

function Registro() {
  const [usuario, setUsuario] = useState("");
  const [password, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async () => {
    try {
      if (!usuario || !password) {
        setError("Por favor, complete todos los campos.");
      } else {
        setError("");

        const registroData = { usuario, password };

        // Registro de usuario
        const registroResponse = await registro(registroData);

        if (registroResponse.status === 409) {
          setError(
            "El usuario ya existe. Por favor, elija otro nombre de usuario."
          );
        } else if (registroResponse.ok) {
          // Registro exitoso, proceder con autologin
          const autologinResponse = await login(registroData);

          if (autologinResponse.ok) {
            const data = await autologinResponse.json();
            localStorage.setItem("token", data.apiKey);
            localStorage.setItem("idUsuario", data.id);
            localStorage.setItem("usuario", usuario);
            navigate("/");
          } else {
            setError("Error en el autologin. Inténtelo de nuevo más tarde.");
          }
        } else {
          setError("Error en el registro. Inténtelo de nuevo más tarde.");
        }
      }
    } catch (error) {
      setError("Error en el registro. Inténtelo de nuevo más tarde.");
    }
  };
  return (
    <>
      <h1 className="form-login-title">Censo 2023</h1>
      <div className="form-login">
        <h5>Registro</h5>

        <input
          className="form-login-controls"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuario"
        />
        <input
          className="form-login-controls"
          type="password"
          value={password}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
        />
        {error && <div>{error}</div>}
        <button className="form-login-buttons" onClick={handleRegistro}>
          Registrarse
        </button>
        <p>
          ¿Ya tienes una cuenta? <a href="/login">Login aquí</a>
        </p>
      </div>
    </>
  );
}

export default Registro;
