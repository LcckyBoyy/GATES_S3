import React, { useState, useEffect } from "react";
import { FaBox, FaTags, FaWarehouse, FaClipboardList } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const { InventoryId } = useParams();
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    categorizedStocks: {},
  });

  const chartRef = React.useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/Product?inventoryId=${InventoryId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const totalStock = data.reduce(
          (sum, product) => sum + (product.currentStock || 0),
          0
        );

        const lowStockCount = data.reduce((count, product) => {
          if ((product.currentStock || 0) <= (product.minimumStock || 0)) {
            return count + 1;
          }
          return count;
        }, 0);

        const categorizedStocks = {};
        data.forEach((product) => {
          const category = product.categoryName || "Other";
          if (!categorizedStocks[category]) {
            categorizedStocks[category] = 0;
          }
          categorizedStocks[category] += product.currentStock || 0;
        });
        
        setInventoryStats({
          totalProducts: data.length,
          totalStock,
          lowStockProducts: lowStockCount,
          categorizedStocks,
        });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [InventoryId]);

  const renderBarChart = () => {
    const ctx = document.getElementById("stockChart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const categories = Object.keys(inventoryStats.categorizedStocks);
    const stockValues = Object.values(inventoryStats.categorizedStocks);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Current Stock Levels by Category",
            backgroundColor: "#007bff",
            data: stockValues,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Categories",
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "Stock Level",
            },
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (Object.keys(inventoryStats.categorizedStocks).length > 0) {
      renderBarChart();
    }
  }, [inventoryStats]);

  const StatCard = ({ icon, title, value, subtext }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow ">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
      </div>
    </div>
  );

  const CategoryBreakdown = () => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Product Categories</h3>
        <FaTags className="text-gray-500" />
      </div>
      <div className="space-y-2">
        {Object.entries(inventoryStats.categorizedStocks).map(
          ([category, stock]) => (
            <div key={category} className="flex items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(stock / inventoryStats.totalStock) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="w-44 text-sm text-gray-600 truncate">
                {category} ({stock})
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );


  return (
    <div className="p-6 bg-gray-50 max-md:mb-20">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Inventory Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Overview of your inventory management
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <StatCard
            icon={<FaBox className="text-blue-500 text-2xl" />}
            title="Total Products"
            value={inventoryStats.totalProducts}
            subtext="Active in inventory"
          />
          <StatCard
            icon={<FaWarehouse className="text-green-500 text-2xl" />}
            title="Total Stock"
            value={inventoryStats.totalStock}
            subtext="Units in warehouse"
          />
          <StatCard
            icon={<FaClipboardList className="text-yellow-500 text-2xl" />}
            title="Low Stock Products"
            value={inventoryStats.lowStockProducts}
            subtext="Requires restocking"
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <CategoryBreakdown />

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <h3 className="text-lg font-semibold mb-4">
              Current Stock Levels by Category
            </h3>
            <canvas id="stockChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
