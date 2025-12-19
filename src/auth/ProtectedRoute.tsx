import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
