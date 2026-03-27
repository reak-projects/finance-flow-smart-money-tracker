import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChartPie, FaWallet, FaExchangeAlt } from 'react-icons/fa';

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Welcome to FinanceFlow 💸</h2>
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              Here's a quick guide on how this application works to help you manage your finances smarter:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
              
              <div>
                <h3 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaExchangeAlt style={{ color: 'var(--accent-primary)' }} /> 1. Track Transactions
                </h3>
                <p>
                  Click "Add Transaction" to log an income or expense. You can categorize it, set the date, mark it as recurring, and add notes. They instantly reflect across all dashboards.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaWallet style={{ color: 'var(--success)' }} /> 2. Set Your Budget
                </h3>
                <p>
                  Go to "Budget" to set a global monthly limit. We'll automatically match up your current month's expenses against the limit, show you category breakdowns, and warn you if you overspend!
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaChartPie style={{ color: 'var(--warning)' }} /> 3. View Analytics
                </h3>
                <p>
                  Your "Dashboard" and "Analytics" pages offer dynamic Recharts showing your spending limits, income versus expenses bars, top categories, and total net balances. 
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-primary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Data Privacy:</strong>
                <p style={{ fontSize: 'var(--font-sm)', marginTop: '4px' }}>
                  All your transaction and budget data is stored safely in your browser's local storage. This application does not send your financial data to external servers. It's completely private to you!
                </p>
              </div>

            </div>

            <div className="modal-actions" style={{ marginTop: 'var(--space-xl)' }}>
              <button type="button" className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
                Got it!
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoModal;
