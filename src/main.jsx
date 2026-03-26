import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./components/Dashboard";
import LoginDashboard from "./components/LoginDashboard";
import Registration from "./components/Registration";
import Patients     from "./components/Patients";
import Shop         from "./components/Shop";
import AddPatientForm from "./components/AddPatientForm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>

          {/* ── PUBLIC ── */}
          <Route path="/"            element={<LoginDashboard />} />
          <Route path="/registration" element={<Registration />} />

          {/* ── USER dashboard ── */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["user", "admin", "doctor", "patient"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ── DOCTOR dashboard ── */}
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute allowedRoles={["doctor", "admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ── PATIENT dashboard ── */}
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute allowedRoles={["patient", "admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ── ADMIN dashboard ── */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ── PROTECTED PAGES ── */}
          <Route
            path="/patients"
            element={
              <PrivateRoute allowedRoles={["admin", "user"]}>
                <Patients />
              </PrivateRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <PrivateRoute allowedRoles={["admin", "doctor"]}>
                <Shop />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-patient"
            element={
              <PrivateRoute allowedRoles={["admin", "user"]}>
                <AddPatientForm />
              </PrivateRoute>
            }
          />

          {/* ── FALLBACK ── */}
          <Route path="*" element={<LoginDashboard />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
