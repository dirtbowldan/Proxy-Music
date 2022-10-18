import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    country: 1000,
    state: 500,
    city: 400,
  },
  {
    name: "February",
    country: 4000,
    state: 2400,
    city: 2400,
  },
  {
    name: "March",
    country: 14000,
    state: 2400,
    city: 21400,
  },
  {
    name: "April",
    country: 4000,
    state: 2400,
    city: 2400,
  },
  {
    name: "May",
    country: 4000,
    state: 2400,
    city: 2400,
  },
  {
    name: "June",
    country: 4000,
    state: 2400,
    city: 2400,
  },
];
const Chart = () => {
  return (
    <div className="chart">
      <div className="title">Last 6 Months</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chartgrid" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="country"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="state"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="city"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
