import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (...args: any[]) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeJwt = (token: string): any | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (...args: any[]) => {
    if (args.length === 2) {
      // email, password flow
      const [email, password] = args;
      if (!email || !password) throw new Error("Email and password required");

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let payload: any = {};
      try {
        payload = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Invalid login response");
      }

      if (!res.ok) {
        throw new Error(payload.error || "Login failed");
      }

      const token: string | undefined = payload.token;
      const returnedUser: any = payload.user;

      if (token) localStorage.setItem("token", token);

      // Prefer returned user object
      if (returnedUser?._id || returnedUser?.id) {
        setUserId(returnedUser._id || returnedUser.id);
        setIsAuthenticated(true);
        return;
      }

      // Try decode token to extract user id (sub or _id)
      if (token) {
        const decoded = decodeJwt(token);
        const idFromToken = decoded?.sub || decoded?._id || decoded?.id;
        if (idFromToken) {
          setUserId(String(idFromToken));
          setIsAuthenticated(true);
          return;
        }
      }

      // Fallback: try /me but handle 404 gracefully (do not throw if missing)
      try {
        const tokenToUse = token || localStorage.getItem("token");
        if (tokenToUse) {
          const meRes = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${tokenToUse}` },
          });
          if (meRes.ok) {
            const meJson = await meRes.json();
            const realId = meJson?.user?._id || meJson?.user?.id;
            if (realId) {
              setUserId(realId);
              setIsAuthenticated(true);
              return;
            }
          } else {
            // if /me is missing (404) or denied, fall through without throwing
            console.warn("/api/auth/me responded:", meRes.status);
          }
        }
      } catch (err) {
        console.warn("Auth me fetch failed:", err);
      }

      // We have a valid login (token) but couldn't derive id — mark session authenticated
      setIsAuthenticated(true);
      setUserId((prev) => prev); // keep null if unknown
      return;
    }

    if (args.length === 1) {
      // token only
      const token = args[0];
      if (!token || typeof token !== "string") throw new Error("Invalid token");
      localStorage.setItem("token", token);

      const decoded = decodeJwt(token);
      const idFromToken = decoded?.sub || decoded?._id || decoded?.id;
      if (idFromToken) {
        setUserId(String(idFromToken));
        setIsAuthenticated(true);
        return;
      }

      // try /me but don't throw on 404
      try {
        const meRes = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (meRes.ok) {
          const meJson = await meRes.json();
          const realId = meJson?.user?._id || meJson?.user?.id;
          if (realId) {
            setUserId(realId);
            setIsAuthenticated(true);
            return;
          }
        } else {
          console.warn("/api/auth/me responded:", meRes.status);
        }
      } catch (err) {
        console.warn("Auth me fetch failed:", err);
      }

      setIsAuthenticated(true);
      return;
    }

    throw new Error("Invalid login call");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};