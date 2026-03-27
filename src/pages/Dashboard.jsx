import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaArrowUp,
  FaArrowDown,
  FaBalanceScale,
  FaTrophy,
  FaPlusCircle,
} from 'react-icons/fa';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/currencyFormatter';
import { CategoryPieChart, MonthlyTrendChart } from '../components/Charts';
import BudgetCard from '../components/BudgetCard';
import TransactionCard from '../components/TransactionCard';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Dashboard = () => {
  const {
    transactions,
    totalIncome,
    totalExpenses,
    netBalance,
    topCategory,
    categoryData,
    monthlyTrend,
  } = useTransactions();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Your financial overview at a glance</p>
      </div>

      <div className="page-content">
        {/* ── Stats ── */}
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
            </div>
          </motion.div>

          <motion.div className="stat-card expense" variants={item}>
            <div className="stat-icon expense"><FaArrowDown /></div>
            <div className="stat-info">
              <div className="stat-label">Total Expenses</div>
              <div className="stat-value" style={{ color: 'var(--expense-color)' }}>
                {formatCurrency(totalExpenses)}
              </div>
            </div>
          </motion.div>

          <motion.div className="stat-card balance" variants={item}>
            <div className="stat-icon balance"><FaBalanceScale /></div>
            <div className="stat-info">
              <div className="stat-label">Net Balance</div>
              <div className="stat-value" style={{ color: netBalance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                {formatCurrency(netBalance)}
              </div>
            </div>
          </motion.div>

          <motion.div className="stat-card top-cat" variants={item}>
            <div className="stat-icon top-cat"><FaTrophy /></div>
            <div className="stat-info">
              <div className="stat-label">Top Spending</div>
              <div className="stat-value" style={{ fontSize: 'var(--font-xl)' }}>
                {topCategory}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Budget Card ── */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <BudgetCard />
        </div>

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
            <h3>Monthly Trend</h3>
            <MonthlyTrendChart data={monthlyTrend} />
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <Link to="/transactions" className="view-all">View all →</Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No transactions yet</h3>
              <p>Start tracking your finances by adding your first transaction.</p>
              <Link to="/transactions/new" className="btn btn-primary">
                <FaPlusCircle /> Add Transaction
              </Link>
            </div>
          ) : (
            <div className="transaction-list">
              {recentTransactions.map((txn, i) => (
                <TransactionCard
                  key={txn.id}
                  transaction={txn}
                  index={i}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
