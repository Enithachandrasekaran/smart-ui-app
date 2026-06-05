import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { PageSkeleton } from "./components/SkeletonLoaders";

import Dashboard from "./components/Dashboard";
import LoginDashboard from "./components/LoginDashboard";
import Registration from "./components/Registration";
import Patients from "./components/Patients";
import Shop from "./components/Shop";
import AddPatientForm from "./components/AddPatientForm";
import LandingPage from "./pages/landingpage/LandingPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";


// Protect Wrapper
const protect = (roles) => (
  <PrivateRoute allowedRoles={roles}>
    <Outlet />
  </PrivateRoute>
);

const AppRoutes = () => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setPageLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <PageSkeleton message="Loading app" />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginDashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/landing" element={<LandingPage />} />


        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={protect(["admin"])}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="shop" element={<Shop />} />
          <Route path="add-patient" element={<AddPatientForm />} />
        </Route>


        {/* ================= DOCTOR ================= */}
        <Route
          path="/doctor"
          element={protect(["doctor", "admin"])}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shop" element={<Shop />} />
        </Route>


        {/* ================= PATIENT ================= */}
        <Route
          path="/patient"
          element={protect(["patient", "admin"])}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>


        {/* ================= USER ================= */}
        <Route
          path="/user"
          element={protect(["user", "admin"])}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="add-patient" element={<AddPatientForm />} />
        </Route>


        {/* FALLBACK */}
        <Route path="*" element={<LandingPage />} />

      </Routes>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <AppRoutes />

      </AuthProvider>

    </BrowserRouter>

  </StrictMode>
);