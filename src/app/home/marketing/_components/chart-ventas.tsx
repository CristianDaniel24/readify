import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Enero", ventas: 4000 },
  { name: "Febrero", ventas: 3000 },
  { name: "Marzo", ventas: 2000 },
  { name: "Abril", ventas: 2780 },
  { name: "Mayo", ventas: 1890 },
  { name: "Junio", ventas: 2390 },
  { name: "Julio", ventas: 3490 },
];

const ChartVentas = () => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ventas"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartVentas;
