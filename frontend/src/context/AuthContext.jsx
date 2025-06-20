import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Example login function
  const login = (userData) => {
    setUser(userData);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
  };

  // Example register function
  const register = async (userData) => {
  try {
    const response = await fetch("http://localhost:8000/api/events/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    const data = await response.json();
    setUser(data); // Optionally set user if your API returns user info
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  return (
    <AuthContext.Provider value={{ currentUser: user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}