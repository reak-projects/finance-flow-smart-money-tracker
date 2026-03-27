import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaSave } from 'react-icons/fa';
import { formatCurrency } from '../utils/currencyFormatter';
import { useBudget } from '../hooks/useBudget';
import { useTransactions } from '../hooks/useTransactions';
import { CATEGORY_CONFIG } from '../utils/constants';

const Budget = () => {
  const {
    monthlyBudget,
    totalSpent,
    remaining,
    percentage,
    isOverBudget,
    setBudget,
  } = useBudget();

  const { transactions } = useTransactions();
  const [inputBudget, setInputBudget] = useState(monthlyBudget || '');

  const handleSetBudget = (e) => {
    e.preventDefault();
    const val = Number(inputBudget);
    if (val > 0) setBudget(val);
  };

  // Category breakdown for current month
  const now = new Date();
  const currentMonthExpenses = transactions.filter((t) => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const categoryBreakdown = {};
  currentMonthExpenses.forEach((t) => {
    categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
  });

  const sortedCategories = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b - a);

  const barClass = percentage >= 90 ? 'danger' : percentage >= 70 ? 'warning' : '';

  return (
    <>
      <div className="page-header">
        <h1>Budget Tracker</h1>
        <p>Set and monitor your monthly spending limits</p>
      </div>

      <div className="page-content">
        <div className="budget-container">
          {/* Budget Overview Stats */}
          <motion.div
            className="budget-overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="budget-stat">
              <div className="label">Monthly Budget</div>
              <div className="value" style={{ color: 'var(--accent-primary-hover)' }}>
                {formatCurrency(monthlyBudget)}
              </div>
            </div>
            <div className="budget-stat">
              <div className="label">Total Spent</div>
              <div className="value" style={{ color: 'var(--expense-color)' }}>
                {formatCurrency(totalSpent)}
              </div>
            </div>
            <div className="budget-stat">
              <div className="label">{isOverBudget ? 'Over Budget' : 'Remaining'}</div>
              <div className="value" style={{ color: isOverBudget ? 'var(--danger)' : 'var(--success)' }}>
                {formatCurrency(Math.abs(remaining))}
              </div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="progress-container"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 600 }}>Budget Usage</h3>
              <span style={{
                fontSize: 'var(--font-sm)',
                fontWeight: 700,
                color: percentage >= 90 ? 'var(--danger)' : percentage >= 70 ? 'var(--warning)' : 'var(--accent-primary-hover)',
              }}>
                {percentage}%
              </span>
            </div>
            <div className="progress-bar-bg">
              <motion.div
                className={`progress-bar-fill ${barClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginTop: '8px' }}>
              {percentage < 50
                ? '✅ Great! You\'re well within your budget.'
                : percentage < 70
                ? '👍 You\'ve used more than half your budget.'
                : percentage < 90
                ? '⚠️ Careful — you\'re approaching your limit.'
                : '🚨 You\'ve exceeded or nearly exceeded your budget!'}
            </p>
          </motion.div>

          {/* Category Breakdown */}
          {sortedCategories.length > 0 && (
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{ marginBottom: 'var(--space-xl)' }}
            >
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
                This Month by Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedCategories.map(([cat, amt]) => {
                  const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG['Other'];
                  const catPercentage = monthlyBudget > 0 ? (amt / monthlyBudget) * 100 : 0;
                  return (
                    <div key={cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: 'var(--font-sm)', color: config.color, fontWeight: 500 }}>
                          {cat}
                        </span>
                        <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                          {formatCurrency(amt)}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(catPercentage, 100)}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          style={{ height: '100%', background: config.color, borderRadius: '99px' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Set Budget Form */}
          <motion.div
            className="budget-set-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
              <FaWallet style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Update Monthly Budget
            </h3>
            <form onSubmit={handleSetBudget}>
              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="budget-amount">Budget Amount (₹)</label>
                  <input
                    id="budget-amount"
                    type="number"
                    className="form-input"
                    value={inputBudget}
                    onChange={(e) => setInputBudget(e.target.value)}
                    placeholder="50000"
                    min="1"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" id="btn-set-budget">
                  <FaSave /> Set Budget
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Budget;
