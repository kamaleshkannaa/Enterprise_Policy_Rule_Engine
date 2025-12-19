import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  // 🔒 If already logged in → go to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
