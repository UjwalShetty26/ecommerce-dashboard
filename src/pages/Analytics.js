import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Analytics() {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch sales data
    axios
      .get("http://localhost:5000/sales")
      .then((res) => setSalesData(res.data))
      .catch((err) => console.error("Error fetching sales data:", err));

    // Fetch products data for category breakdown
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const categoryCounts = res.data.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});
        setCategoryData(
          Object.entries(categoryCounts).map(([name, value]) => ({
            name,
            value,
          }))
        );
      })
      .catch((err) => console.error("Error fetching products data:", err));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Analytics</h2>

      {/* Sales Line Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Sales Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Products by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
