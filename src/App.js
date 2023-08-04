import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/auth/Login";
import Registro from "./Components/auth/Registro";
import Dashboard from "./Components/dashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
