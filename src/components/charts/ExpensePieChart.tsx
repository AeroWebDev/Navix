import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface ExpenseCategoryData {
  name: string;
  value: number;
}

interface ExpensePieChartProps {
  data: ExpenseCategoryData[];
  height?: number;
}

const COLORS = [
  '#2E8B70', // NAVIX Emerald
  '#172A3A', // NAVIX Deep Navy
  '#B9683E', // NAVIX Expense Burnt Orange
  '#397A78', // NAVIX Teal Info
  '#C58A32', // NAVIX Amber
  '#755A78', // NAVIX Plum Special
  '#B54848', // NAVIX Burgundy
  '#9AA3A0', // NAVIX Soft Gray
];

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data, height = 320 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.5rem',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
