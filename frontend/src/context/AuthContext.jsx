import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole); // Set the role on login
  };

  const logout = () => {
    setUser(null);
    setRole(null); // Clear the role on logout
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};