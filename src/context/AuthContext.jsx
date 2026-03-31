import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('argos_user')) || null; } catch { return null; }
  });

  const login = (email, password) => {
    // Mock authentication - replace with real API later
    if (email && password.length >= 6) {
      const mockUser = {
        id: 1,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        avatar: '👤',
        memberSince: new Date().getFullYear(),
        tier: 'Gold Member',
      };
      setUser(mockUser);
      localStorage.setItem('argos_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Password must be at least 6 characters.' };
  };

  const register = (name, email, password) => {
    if (name && email && password.length >= 6) {
      const newUser = {
        id: Date.now(),
        name,
        email,
        avatar: '👤',
        memberSince: new Date().getFullYear(),
        tier: 'Silver Member',
      };
      setUser(newUser);
      localStorage.setItem('argos_user', JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields. Password must be at least 6 characters.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('argos_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
