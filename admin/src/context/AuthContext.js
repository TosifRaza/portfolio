import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/endpoints';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedAdmin = localStorage.getItem('admin_data');

    if (storedToken) {
      setToken(storedToken);
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin));
          setIsAuthenticated(true);
        } catch {
          // Invalid stored data, validate with API
        }
      }
      // Validate token with API
      authApi
        .getMe()
        .then((res) => {
          if (res.data?.success) {
            const adminData = res.data.data;
            setAdmin(adminData);
            localStorage.setItem('admin_data', JSON.stringify(adminData));
            setIsAuthenticated(true);
          } else {
            logout();
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    toast.success('Logged out successfully');
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      if (res.data?.success) {
        const { token: newToken, admin: adminData } = res.data.data;
        setToken(newToken);
        setAdmin(adminData);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', newToken);
        localStorage.setItem('admin_data', JSON.stringify(adminData));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error(res.data?.message || 'Login failed');
        return false;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
