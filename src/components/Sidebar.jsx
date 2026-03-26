import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Role based menu config
const MENU = {
  admin: [
    { name: "Dashboard",    path: "/admin/dashboard" },
    { name: "Patients",     path: "/patients" },
    { name: "Shop",         path: "/shop" },
    { name: "Appointments" },
    { name: "Tools" },
    { name: "Settings" },
  ],
  doctor: [
    { name: "Dashboard",    path: "/doctor/dashboard" },
    { name: "Shop",         path: "/shop" },
  ],
  patient: [
    { name: "Dashboard", path: "/patient/dashboard" },
  ],
  user: [
    { name: "Dashboard",    path: "/dashboard" },
    { name: "Patients",     path: "/patients" },
  ],
};

const ROLE_BADGE = {
  admin:  { bg: "#fff0f0", color: "#c0392b", label: "Admin"  },
  doctor: { bg: "#f0f7ff", color: "#2471a3", label: "Doctor" },
  patient:{ bg: "#f9f0ff", color: "#7d3c98", label: "Patient" },
  user:   { bg: "#f0fff4", color: "#1e8449", label: "User"   },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useAuth();

  const role      = auth?.role  || "user";
  const user      = auth?.user  || {};
  const menuItems = MENU[role]  || MENU.user;
  const badge     = ROLE_BADGE[role] || ROLE_BADGE.user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      width: "220px",
      minHeight: "100vh",
      background: "#1a1a2e",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "24px 0",
    }}>

      {/* ── User Info ── */}
      <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #ffffff15" }}>

        {/* Avatar */}
        <div style={{
          width: "48px", height: "48px",
          borderRadius: "50%",
          background: badge.bg,
          color: badge.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "18px",
          marginBottom: "10px",
        }}>
          {user?.firstName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        {/* Name */}
        <div style={{ fontWeight: 600, fontSize: "15px", color: "#fff" }}>
          {user?.firstName} {user?.lastName}
        </div>

        {/* Email */}
        <div style={{
          fontSize: "11px", color: "#aaa",
          marginBottom: "8px", wordBreak: "break-all"
        }}>
          {user?.email}
        </div>

        {/* Role Badge */}
        <span style={{
          fontSize: "10px", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "1px",
          padding: "3px 10px", borderRadius: "20px",
          background: badge.bg, color: badge.color,
          display: "inline-block",
        }}>
          {badge.label}
        </span>
      </div>

      {/* ── Menu Items ── */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.path ? (
                <Link
                  to={item.path}
                  style={{
                    display: "block",
                    padding: "12px 20px",
                    color: isActive(item.path) ? "#fff" : "#bbb",
                    background: isActive(item.path) ? "#ffffff18" : "transparent",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: isActive(item.path) ? 600 : 400,
                    borderLeft: isActive(item.path)
                      ? `3px solid ${badge.color}`
                      : "3px solid transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = "#ffffff10";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#bbb";
                    }
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                // Coming soon — no path
                <span style={{
                  display: "block", padding: "12px 20px",
                  color: "#555", fontSize: "14px",
                  borderLeft: "3px solid transparent",
                  cursor: "not-allowed",
                }}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Logout ── */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #ffffff15" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", padding: "10px",
            background: "#c0392b22", color: "#e74c3c",
            border: "1px solid #e74c3c44", borderRadius: "8px",
            cursor: "pointer", fontSize: "14px", fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e74c3c";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#c0392b22";
            e.currentTarget.style.color = "#e74c3c";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;