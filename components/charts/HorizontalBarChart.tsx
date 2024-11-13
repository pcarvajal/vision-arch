import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Oct',
    r3332: 4000,
    r444: 2400,
    amt: 2400,
  },
  {
    name: 'Nov',
    r3332: 3000,
    r444: 1398,
    amt: 2210,
  },
];

const HorizontalBarChart = () => {
  return (
    <BarChart
      width={420}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="r3332"
        fill="#1a70f0"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="r444"
        fill="#56e9b1"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  );
};

export default HorizontalBarChart;
