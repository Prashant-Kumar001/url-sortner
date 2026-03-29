import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

const ClicksChart = ({ clicks }) => {
  const data = React.useMemo(() => {
    const map = {};

    clicks.forEach((c) => {
      const city = c.city?.trim().toLowerCase() || "unknown";

      if (!map[city]) {
        map[city] = 0;
      }

      map[city]++;
    });

    return Object.entries(map).map(([city, count]) => ({
      city: city.charAt(0).toUpperCase() + city.slice(1),
      clicks: count,
    }));
  }, [clicks]);


  return (
    <div className="p-4 border rounded-2xl bg-card">
      <h2 className="text-lg font-semibold mb-4">Clicks by City</h2>

      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <YAxis tick={{ fontSize: 12 }} />
            <XAxis dataKey="city" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Bar dataKey="clicks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClicksChart;
