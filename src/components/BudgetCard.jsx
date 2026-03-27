import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currencyFormatter';
import { useBudget } from '../hooks/useBudget';

const BudgetCard = () => {
  const { monthlyBudget, totalSpent, remaining, percentage, isOverBudget } = useBudget();

  const barClass = percentage >= 90 ? 'danger' : percentage >= 70 ? 'warning' : '';

  if (monthlyBudget <= 0) return null;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 600 }}>Monthly Budget</h3>
        <span style={{
          fontSize: 'var(--font-xs)',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          background: isOverBudget ? 'var(--danger-bg)' : 'var(--success-bg)',
          color: isOverBudget ? 'var(--danger)' : 'var(--success)',
        }}>
          {isOverBudget ? 'Over Budget' : 'On Track'}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: '8px' }}>
        <span>Spent: {formatCurrency(totalSpent)}</span>
        <span>Budget: {formatCurrency(monthlyBudget)}</span>
      </div>

      <div className="progress-bar-bg">
        <motion.div
          className={`progress-bar-fill ${barClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
        <span>{percentage}% used</span>
        <span>{formatCurrency(Math.abs(remaining))} {isOverBudget ? 'over' : 'remaining'}</span>
      </div>
    </motion.div>
  );
};

export default BudgetCard;
