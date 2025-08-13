import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Permission-based Route Component
const PermissionRoute = ({ children, permission }) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(permission)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Content
const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar onMenuClick={() => setSidebarOpen(true)} />
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <Dashboard />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar onMenuClick={() => setSidebarOpen(true)} />
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <Products />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/add"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar onMenuClick={() => setSidebarOpen(true)} />
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <PermissionRoute permission="create_products">
                    <AddProduct />
                  </PermissionRoute>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar onMenuClick={() => setSidebarOpen(true)} />
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <PermissionRoute permission="edit_products">
                    <EditProduct />
                  </PermissionRoute>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar onMenuClick={() => setSidebarOpen(true)} />
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <Reports />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar onMenuClick={() => setSidebarOpen(true)} />
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <About />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
