import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// Create Global Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Only JWT token and user profile session are stored in localStorage for page refresh persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ebook_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('ebook_token') || null);
  const [loading, setLoading] = useState(false);

  // Verify active JWT token with MongoDB backend on app load
  useEffect(() => {
    if (token) {
      api.getMe()
        .then((res) => {
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('ebook_user', JSON.stringify(res.data));
          } else {
            logout();
          }
        })
        .catch(() => {});
    }
  }, [token]);

  // Sign In directly against MongoDB User collection
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      if (res.success && res.data) {
        setUser(res.data);
        setToken(res.data.token);
        localStorage.setItem('ebook_token', res.data.token);
        localStorage.setItem('ebook_user', JSON.stringify(res.data));
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: res.message || 'Invalid email or password' };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Could not connect to backend server. Please verify backend is running.' };
    }
  };

  // Register directly into MongoDB User collection
  const register = async (name, email, password, role = 'user') => {
    setLoading(true);
    try {
      const res = await api.register({ name, email, password, role });
      if (res.success && res.data) {
        setUser(res.data);
        setToken(res.data.token);
        localStorage.setItem('ebook_token', res.data.token);
        localStorage.setItem('ebook_user', JSON.stringify(res.data));
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: res.message || 'Registration failed' };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Could not connect to backend server. Please verify backend is running.' };
    }
  };

  // Sign Out
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ebook_token');
    localStorage.removeItem('ebook_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user),
        isAdmin: user && user.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
