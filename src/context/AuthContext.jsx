// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Restore user from localStorage on load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const mockUser = { username: email.split("@")[0] || "user", email };
    setUser(mockUser);
    setToken("mock-token");
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true };
  };

  const signup = async (email, password, username) => {
    const mockUser = { username, email };
    setUser(mockUser);
    setToken("mock-token");
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
