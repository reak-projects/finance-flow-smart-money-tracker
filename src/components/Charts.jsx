import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
} from 'recharts';
import { CATEGORY_CONFIG, CHART_COLORS } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormatter';

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(17,24,39,0.95)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      padding: '10px 14px',
      fontSize: '0.8rem',
    }}>
      {label && <p style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

/* ── Pie: Spending by Category ── */
export const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="empty-state"><p>No expense data yet</p></div>;
  }

  const getColor = (name) => {
    const config = CATEGORY_CONFIG[name];
    return config ? config.color : '#94a3b8';
  };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
          stroke="none"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '0.75rem', color: '#94a3b8' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

/* ── Line: Monthly Spending Trend ── */
export const MonthlyTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="empty-state"><p>Not enough data for trends</p></div>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="expense"
          name="Expenses"
          stroke="#f472b6"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#f472b6' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="income"
          name="Income"
          stroke="#22d3ee"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#22d3ee' }}
          activeDot={{ r: 6 }}
        />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="line"
          wrapperStyle={{ fontSize: '0.75rem' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

/* ── Bar: Income vs Expenses ── */
export const IncomeExpenseBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="empty-state"><p>Not enough data</p></div>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" name="Income" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name="Expenses" fill="#f472b6" radius={[4, 4, 0, 0]} />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="rect"
          iconSize={10}
          wrapperStyle={{ fontSize: '0.75rem' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
