import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const COOKIE_KEY = "furtart_auth";

const sanitizeUser = (user = {}) => {
  const {
    password,
    passcode,
    otp,
    refreshToken,
    accessToken,
    ...safeUser
  } = user || {};
  return safeUser;
};

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return match ? match.split("=")[1] : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = getCookie(COOKIE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.user) {
          const safeUser = sanitizeUser(parsed.user);
          const safeRole = (parsed.role || safeUser.role || "user").toLowerCase();
          setAuth({ user: safeUser, role: safeRole });
        } else {
          deleteCookie(COOKIE_KEY);
        }
      }
    } catch (err) {
      console.error("Failed to restore auth from cookie:", err);
      deleteCookie(COOKIE_KEY);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user) => {
    try {
      const safeUser = sanitizeUser(user);
      const role = (safeUser.role || "user").toLowerCase();

      // Keep only non-sensitive fields in client storage.
      const authData = { user: safeUser, role };
      setAuth(authData);
      setCookie(COOKIE_KEY, JSON.stringify(authData), 7);
      localStorage.setItem("user", JSON.stringify(safeUser));
    } catch (err) {
      console.error("Failed to save auth state:", err);
      setAuth(null);
      deleteCookie(COOKIE_KEY);
      localStorage.removeItem("user");
      throw new Error("Could not save login session.");
    }
  };

  const logout = () => {
    setAuth(null);
    deleteCookie(COOKIE_KEY);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);