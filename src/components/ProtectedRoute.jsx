import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { logado } = useAuth();

  return logado ? children : <Navigate to="/login" replace />;
}
