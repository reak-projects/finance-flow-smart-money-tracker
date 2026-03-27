import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { CATEGORY_CONFIG } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormatter';

const TransactionCard = ({ transaction, onEdit, onDelete, index = 0 }) => {
  const { id, title, amount, category, type, date, notes, recurring } = transaction;
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['Other'];
  const Icon = config.icon;

  return (
    <motion.div
      className={`transaction-card${recurring ? ' recurring' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      layout
    >
      <div
        className="txn-cat-icon"
        style={{ background: config.bg, color: config.color }}
      >
        <Icon />
      </div>

      <div className="txn-details">
        <div className="txn-title">{title}</div>
        <div className="txn-meta">
          <span style={{ color: config.color }}>{category}</span>
          <span>•</span>
          <span>{format(new Date(date), 'dd MMM yyyy')}</span>
          {recurring && <span className="recurring-badge">Recurring</span>}
          {notes && (
            <>
              <span>•</span>
              <span title={notes}>{notes.length > 30 ? notes.slice(0, 30) + '…' : notes}</span>
            </>
          )}
        </div>
      </div>

      <div className={`txn-amount ${type}`}>
        {type === 'income' ? '+' : '−'} {formatCurrency(amount)}
      </div>

      <div className="txn-actions">
        <button
          id={`edit-txn-${id}`}
          onClick={() => onEdit(transaction)}
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          id={`delete-txn-${id}`}
          className="delete"
          onClick={() => onDelete(id)}
          title="Delete"
        >
          <FaTrashAlt />
        </button>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
