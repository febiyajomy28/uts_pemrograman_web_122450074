import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      // Coba login ke dummyjson API dulu
      const apiResponse = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const apiData = await apiResponse.json();

      if (apiData.token) {
        setUser(apiData);
        localStorage.setItem("user", JSON.stringify(apiData));
        return { success: true };
      }

      // Jika gagal ke API, coba ke local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const localUser = users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (localUser) {
        setUser(localUser);
        localStorage.setItem("user", JSON.stringify(localUser));
        return { success: true };
      }

      return { success: false, message: "Invalid credentials" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check localStorage for user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
