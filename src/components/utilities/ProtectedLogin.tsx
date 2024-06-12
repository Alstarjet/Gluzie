import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedLoginProps {
  children: ReactNode;
}

const ProtectedLogin: React.FC<ProtectedLoginProps> = ({ children }) => {
  const token = localStorage.getItem('Token');

  if (token) {
    // Si el token no existe, redirigir a la página de inicio de sesión
    return <Navigate to="/dataexplore" />;
  }

  // Si el token existe, renderizar los componentes hijos
  return <>{children}</>;
};

export default ProtectedLogin;
