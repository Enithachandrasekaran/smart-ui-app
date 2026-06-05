import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageSkeleton } from "./SkeletonLoaders";

const PrivateRoute = ({ allowedRoles }) => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <PageSkeleton message="Checking session" />;
  }

  // Check auth
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // Get role
  const role = (auth.role || "user").toLowerCase();

  // Role validation
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;