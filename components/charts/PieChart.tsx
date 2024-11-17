'use client';
import { PieChart as PieChartRC, Pie, Tooltip, Cell } from 'recharts';

const data01 = [
  { name: 'Avance', value: 41.6, fill: '#56e9b1' },
  { name: 'Pendiente', value: 58.4, fill: '#1a70f0' },
];
const COLORS = ['#56e9b1', '#1a70f0'];

const PieChart = () => {
  return (
    <PieChartRC width={200} height={220}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      {data01.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      <Tooltip />
    </PieChartRC>
  );
};

export default PieChart;
