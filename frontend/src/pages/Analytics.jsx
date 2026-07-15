import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/statistics/`
    );

    const result = await response.json();
    setData(result);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Survey Analytics</h1>

      <div
        style={{
          background: "#1e1e2f",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #ff4d4f",
          marginTop: "20px"
        }}
      >
        <h2>Customer Satisfaction Survey</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="option" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ff4d4f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}