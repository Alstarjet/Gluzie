import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('Token');

  if (!token) {
    // Si el token no existe, redirigir a la página de inicio de sesión
    return <Navigate to="/" />;
  }

  // Si el token existe, renderizar los componentes hijos
  return <>{children}</>;
};

export default ProtectedRoute;
