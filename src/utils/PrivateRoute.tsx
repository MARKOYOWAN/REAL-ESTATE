// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom"; 
import { useAuth } from "../auth/services/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "agent" | "client";
}

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // ⚠️ ici tu dois adapter selon où tu stockes le rôle
  const userRole = user.user_metadata?.role;

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
