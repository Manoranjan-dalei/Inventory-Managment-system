import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CubeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Reports = () => {
  const { hasPermission } = useAuth();
  const [reports, setReports] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    lowStockItems: 0,
    topProducts: [],
    stockStatus: {},
    categories: {},
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  const fetchReportsData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authentication token found. Please login again.");
        return;
      }

      // Fetch all products to calculate reports
      const response = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = response.data;

      // Calculate statistics
      const totalProducts = products.length;
      const totalRevenue = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      const lowStockItems = products.filter(
        (product) =>
          product.status === "LOW_STOCK" || product.status === "OUT_OF_STOCK"
      ).length;

      // Calculate top products by value (price * quantity)
      const topProducts = products
        .map((product) => ({
          name: product.name,
          sales: product.quantity,
          revenue: product.price * product.quantity,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Calculate stock status distribution
      const stockStatus = products.reduce((acc, product) => {
        acc[product.status] = (acc[product.status] || 0) + 1;
        return acc;
      }, {});

      // Calculate category distribution
      const categories = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      setReports({
        totalRevenue,
        totalProducts,
        lowStockItems,
        topProducts,
        stockStatus,
        categories,
      });

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching reports data:", error);
      toast.error("Failed to load reports data");

      if (error.response?.status === 401) {
        // Handle authentication error
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  // Real-time auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchReportsData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchReportsData]);

  // Manual refresh function
  const handleManualRefresh = () => {
    setLoading(true);
    fetchReportsData();
    toast.success("Reports refreshed!");
  };

  const statCards = [
    {
      name: "Total Value",
      value: `$${reports.totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: "bg-green-500",
      change: "+0%",
      changeType: "neutral",
    },
    {
      name: "Total Products",
      value: reports.totalProducts,
      icon: CubeIcon,
      color: "bg-blue-500",
      change: "+0%",
      changeType: "neutral",
    },
    {
      name: "Low Stock Items",
      value: reports.lowStockItems,
      icon: ChartBarIcon,
      color: "bg-yellow-500",
      change: "+0%",
      changeType: "neutral",
    },
  ];

  // Chart configurations
  const barChartData = {
    labels: reports.topProducts.map((product) => product.name),
    datasets: [
      {
        label: "Total Value ($)",
        data: reports.topProducts.map((product) => product.revenue),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(reports.stockStatus),
    datasets: [
      {
        data: Object.values(reports.stockStatus),
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // Green for IN_STOCK
          "rgba(245, 158, 11, 0.8)", // Yellow for LOW_STOCK
          "rgba(239, 68, 68, 0.8)", // Red for OUT_OF_STOCK
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(reports.categories),
    datasets: [
      {
        label: "Products by Category",
        data: Object.values(reports.categories),
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(245, 158, 11, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(139, 92, 246, 0.6)",
          "rgba(236, 72, 153, 0.6)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Inventory Analytics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Stock Status Distribution",
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Real-time Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              View detailed reports and insights
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            {/* Auto-refresh toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoRefresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="autoRefresh"
                className="ml-2 text-sm text-gray-700"
              >
                Auto-refresh
              </label>
            </div>

            {/* Refresh interval selector */}
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
              disabled={!autoRefresh}
            >
              <option value={10000}>10s</option>
              <option value={30000}>30s</option>
              <option value={60000}>1m</option>
              <option value={300000}>5m</option>
            </select>

            {/* Manual refresh button */}
            <button
              onClick={handleManualRefresh}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ClockIcon className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Top Products by Value
          </h2>
          <div className="h-80">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Stock Status Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Stock Status Distribution
          </h2>
          <div className="h-80">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Category Distribution Line Chart */}
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Products by Category
        </h2>
        <div className="h-80">
          <Line data={categoryChartData} options={chartOptions} />
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Top Products by Value
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.topProducts.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
