import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import {
  CubeIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const { hasPermission, isAdmin } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("No authentication token found. Please login again.");
          return;
        }

        // Fetch all products to calculate stats
        const response = await axios.get("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const products = response.data;

        // Calculate statistics
        const totalProducts = products.length;
        const totalValue = products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
        const lowStockItems = products.filter(
          (product) =>
            product.status === "LOW_STOCK" || product.status === "OUT_OF_STOCK"
        ).length;

        // Mock recent activity (since we don't have activity tracking in backend yet)
        const recentActivity = [
          {
            id: 1,
            action: "Products loaded",
            product: `${totalProducts} items`,
            time: "Just now",
          },
          {
            id: 2,
            action: "System ready",
            product: "Inventory Management",
            time: "Today",
          },
        ];

        setStats({
          totalProducts,
          totalValue,
          lowStockItems,
          recentActivity,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");

        if (error.response?.status === 401) {
          // Handle authentication error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      name: "Total Products",
      value: stats.totalProducts,
      icon: CubeIcon,
      color: "bg-blue-500",
      change: "+0%",
      changeType: "neutral",
    },
    {
      name: "Total Value",
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: "bg-green-500",
      change: "+0%",
      changeType: "neutral",
    },
    {
      name: "Low Stock Items",
      value: stats.lowStockItems,
      icon: ExclamationTriangleIcon,
      color: "bg-yellow-500",
      change: "+0%",
      changeType: "neutral",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to your Inventory Management System
          {isAdmin() && (
            <span className="text-blue-600 font-medium"> (Administrator)</span>
          )}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-l-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className={`h-8 w-8 text-white ${stat.color} rounded-lg p-1.5`}
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                {stat.changeType === "increase" ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500" />
                ) : stat.changeType === "decrease" ? (
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                ) : (
                  <span className="h-4 w-4 text-gray-400">-</span>
                )}
                <span
                  className={`ml-1 font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-gray-500">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {hasPermission("create_products") && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/products/add"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <PlusIcon className="h-6 w-6 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">
                Add Product
              </span>
            </Link>
            <Link
              to="/products"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CubeIcon className="h-6 w-6 text-green-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">
                View Products
              </span>
            </Link>
            <Link
              to="/reports"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChartBarIcon className="h-6 w-6 text-purple-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">
                View Reports
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.product}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
