import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { auth, loading } = useAuth();

  // Wait for cookie restore on first load/refresh
  if (loading) {
    return null;
  }

  if (!auth?.user) {
    return <Navigate to="/" />;
  }

  const role = (auth.user.role || "user").toLowerCase();

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;