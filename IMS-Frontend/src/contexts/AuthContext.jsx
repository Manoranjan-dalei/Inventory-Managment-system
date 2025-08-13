import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        const userData = {
          id: response.data.id || Date.now(),
          username: response.data.username,
          role: response.data.role,
          fullName: response.data.fullName,
        };

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        toast.success(
          `Welcome back, ${userData.fullName || userData.username}!`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        toast.error("Invalid username or password");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  // Role-based access control functions
  const hasPermission = (permission) => {
    if (!user) return false;

    const permissions = {
      ADMIN: [
        "view_dashboard",
        "view_products",
        "create_products",
        "edit_products",
        "delete_products",
        "view_reports",
        "view_about",
      ],
      USER: ["view_dashboard", "view_products", "view_reports", "view_about"],
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const isAdmin = () => user?.role === "ADMIN";
  const isUser = () => user?.role === "USER";

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    isAdmin,
    isUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
