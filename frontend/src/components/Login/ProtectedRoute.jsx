// src/components/Login/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// ✅ IMPORTANTE: Usa llaves { } para que coincida con la exportación
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const context = useContext(CurrentUserContext);

  // Verificación de seguridad
  if (!context) {
    console.error(
      "ProtectedRoute: El contexto es indefinido. Verifica el Provider en App.jsx",
    );
    return null;
  }

  const { isLoggedIn } = context;

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
