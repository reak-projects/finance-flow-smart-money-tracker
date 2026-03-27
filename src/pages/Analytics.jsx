import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaBalanceScale, FaTrophy } from 'react-icons/fa';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/currencyFormatter';
import {
  CategoryPieChart,
  MonthlyTrendChart,
  IncomeExpenseBarChart,
} from '../components/Charts';

const Analytics = () => {
  const {
    totalIncome,
    totalExpenses,
    netBalance,
    topCategory,
    categoryData,
    monthlyTrend,
    transactions,
  } = useTransactions();

  // Recurring transactions summary
  const recurringExpenses = transactions
    .filter((t) => t.recurring && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const recurringIncome = transactions
    .filter((t) => t.recurring && t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransactions = transactions.length;
  const incomeCount = transactions.filter((t) => t.type === 'income').length;
  const expenseCount = transactions.filter((t) => t.type === 'expense').length;

  const avgExpense = expenseCount > 0 ? totalExpenses / expenseCount : 0;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Deep insights into your financial health</p>
      </div>

      <div className="page-content">
        {/* ── Summary Stats ── */}
        <motion.div
          className="stats-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="stat-card income" variants={item}>
            <div className="stat-icon income"><FaArrowUp /></div>
            <div className="stat-info">
              <div className="stat-label">Total Income</div>
              <div className="stat-value" style={{ color: 'var(--income-color)' }}>
                {formatCurrency(totalIncome)}
              </div>
              <div className="stat-sub">{incomeCount} transactions</div>
            </div>
          </motion.div>

          <motion.div className="stat-card expense" variants={item}>
            <div className="stat-icon expense"><FaArrowDown /></div>
            <div className="stat-info">
              <div className="stat-label">Total Expenses</div>
              <div className="stat-value" style={{ color: 'var(--expense-color)' }}>
                {formatCurrency(totalExpenses)}
              </div>
              <div className="stat-sub">{expenseCount} transactions</div>
            </div>
          </motion.div>

          <motion.div className="stat-card balance" variants={item}>
            <div className="stat-icon balance"><FaBalanceScale /></div>
            <div className="stat-info">
              <div className="stat-label">Net Balance</div>
              <div className="stat-value" style={{ color: netBalance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                {formatCurrency(netBalance)}
              </div>
              <div className="stat-sub">Savings rate: {totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0}%</div>
            </div>
          </motion.div>

          <motion.div className="stat-card top-cat" variants={item}>
            <div className="stat-icon top-cat"><FaTrophy /></div>
            <div className="stat-info">
              <div className="stat-label">Top Category</div>
              <div className="stat-value" style={{ fontSize: 'var(--font-xl)' }}>
                {topCategory}
              </div>
              <div className="stat-sub">Avg expense: {formatCurrency(Math.round(avgExpense))}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Extra Quick Stats ── */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ marginBottom: 'var(--space-xl)' }}
        >
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em' }}>Total Transactions</span>
            <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700 }}>{totalTransactions}</span>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em' }}>Recurring Expenses</span>
            <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--expense-color)' }}>{formatCurrency(recurringExpenses)}</span>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em' }}>Recurring Income</span>
            <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--income-color)' }}>{formatCurrency(recurringIncome)}</span>
          </div>
        </motion.div>

        {/* ── Charts ── */}
        <div className="charts-grid">
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Spending by Category</h3>
            <CategoryPieChart data={categoryData} />
          </motion.div>

          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Income vs Expenses</h3>
            <IncomeExpenseBarChart data={monthlyTrend} />
          </motion.div>
        </div>

        <motion.div
          className="charts-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 0 }}
        >
          <motion.div className="chart-card" style={{ gridColumn: '1 / -1' }}>
            <h3>Monthly Spending Trend</h3>
            <MonthlyTrendChart data={monthlyTrend} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Analytics;
