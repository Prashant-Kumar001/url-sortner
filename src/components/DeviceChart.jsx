import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const DeviceChart = ({ clicks }) => {
  const data = React.useMemo(() => {
    const map = {};

    clicks.forEach((c) => {
      const device = c.device?.trim().toLowerCase() || "unknown";

      if (!map[device]) {
        map[device] = 0;
      }

      map[device]++;
    });

    return Object.entries(map).map(([device, count]) => ({
      name: device.charAt(0).toUpperCase() + device.slice(1),
      value: count,
    }));
  }, [clicks]);

  if(!data.length) return <div className="p-4 border rounded-2xl bg-card">No clicks</div>;

  return (
    <div className="p-4 border rounded-2xl bg-card">
      <h2 className="text-lg font-semibold mb-4">Clicks by Device</h2>

          <PieChart
            style={{
              width: "100%",
              maxHeight: "80vh",
              aspectRatio: 1,
            }}
            responsive
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
    </div>
  );
};

export default DeviceChart;
