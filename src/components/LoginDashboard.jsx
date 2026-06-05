import "./LoginDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Registration from "./Registration";
import { useAuth } from "../context/AuthContext";
import bloodImage from "../assets/login-blood-donation-image.png";
import { ButtonSkeleton } from "./SkeletonLoaders";

const API_BASE =
  (import.meta.env.VITE_API_URL &&
    String(import.meta.env.VITE_API_URL).startsWith("http"))
    ? String(import.meta.env.VITE_API_URL).replace(/\/$/, "")
    : "http://localhost:5001";
const LOGIN_URL = `${API_BASE}/login`;

const ROLE_ROUTES = {
  admin: "/admin/dashboard",
  doctor: "/doctor/dashboard",
  patient: "/patient/dashboard",
  user: "/user/dashboard",
};

const LoginDashboard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        signal: controller.signal,
      });

      const data = await response
        .json()
        .catch(() => ({ message: "Invalid response from server." }));

      clearTimeout(timeoutId);

      if (!response.ok) {
        setError(
          data.message ||
            `Login failed (${response.status}). Check backend at ${API_BASE}.`
        );
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Invalid server response.");
        setLoading(false);
        return;
      }

      // Save login (sanitized in AuthContext).
      login(user, data.token || "");

      // ✅ FIX ROLE (important)
      const role = (user.role || "user").toLowerCase();
      navigate(ROLE_ROUTES[role] || "/user/dashboard");

    } catch (err) {
      const isAbort =
        err?.name === "AbortError" ||
        String(err?.message || "").toLowerCase().includes("aborted");
      setError(
        isAbort
          ? `Login request timed out. Is backend running at ${API_BASE}?`
          : `Cannot connect to backend at ${API_BASE}. Start your backend server, then try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isLogin) {
    return <Registration onSwitchToLogin={() => setIsLogin(true)} />;
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-card">

          <div className="login-header">
            <p className="login-kicker">Welcome Back</p>
            <h1 className="login-title">Login</h1>
            <h2 className="login-subtitle">RedStream Dashboard</h2>
          </div>

          {error && <p className="error">{error}</p>}

          <form className="login-form" onSubmit={handleLogin}>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? <ButtonSkeleton label="Logging in" /> : "LOGIN"}
            </button>

          </form>

          {/* ✅ FIXED REGISTER LINK */}
          <div className="register-link">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(false);
              }}
            >
              REGISTER
            </a>
          </div>

        </div>
      </div>

      <div className="login-right">
        <img className="login-right-image" src={bloodImage} alt="Login illustration" />
      </div>
    </div>
  );
};

export default LoginDashboard;