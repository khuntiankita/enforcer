// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/logout`, {}, {
        withCredentials: true,
      });
      setUser(false); // Set user to false after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Even on error, attempt to clear the frontend state
      setUser(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      console.log('Auth check initiated...');
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          withCredentials: true,
        });
        console.log('Auth check successful. User data:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('Auth check failed:', err.response?.data);
        setUser(false);
      } finally {
        setIsLoading(false);
        console.log('Auth check finished.');
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
