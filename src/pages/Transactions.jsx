import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlusCircle } from 'react-icons/fa';
import { useTransactions } from '../hooks/useTransactions';
import { useDebounce } from '../hooks/useDebounce';
import TransactionCard from '../components/TransactionCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import EditTransactionModal from '../components/EditTransactionModal';

const Transactions = () => {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Edit modal
  const [editingTxn, setEditingTxn] = useState(null);

  const filtered = useMemo(() => {
    let result = [...transactions];

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.notes && t.notes.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Type filter
    if (typeFilter) {
      result = result.filter((t) => t.type === typeFilter);
    }

    // Date range
    if (dateFrom) {
      result = result.filter((t) => t.date >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((t) => t.date <= dateTo);
    }

    // Sort
    switch (sortBy) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amount-desc':
        result.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        result.sort((a, b) => a.amount - b.amount);
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return result;
  }, [transactions, debouncedSearch, categoryFilter, typeFilter, sortBy, dateFrom, dateTo]);

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1>Transactions</h1>
            <p>{transactions.length} total transactions</p>
          </div>
          <Link to="/transactions/new" className="btn btn-primary" id="add-transaction-btn">
            <FaPlusCircle /> Add Transaction
          </Link>
        </div>
      </div>

      <div className="page-content">
        {/* Toolbar */}
        <div className="toolbar">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Filters
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
          />
        </div>

        {/* Results count */}
        {(debouncedSearch || categoryFilter || typeFilter || dateFrom || dateTo) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}
          >
            Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </motion.p>
        )}

        {/* Transaction List */}
        {filtered.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">🔍</div>
            <h3>No transactions found</h3>
            <p>
              {debouncedSearch || categoryFilter || typeFilter
                ? 'Try adjusting your filters or search terms.'
                : 'Start by adding your first transaction.'}
            </p>
            {!debouncedSearch && !categoryFilter && !typeFilter && (
              <Link to="/transactions/new" className="btn btn-primary">
                <FaPlusCircle /> Add Transaction
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="transaction-list">
            <AnimatePresence>
              {filtered.map((txn, i) => (
                <TransactionCard
                  key={txn.id}
                  transaction={txn}
                  index={i}
                  onEdit={setEditingTxn}
                  onDelete={deleteTransaction}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* FAB for mobile */}
      <Link to="/transactions/new" className="fab" id="fab-add-transaction">
        <FaPlusCircle />
      </Link>

      {/* Edit Modal */}
      {editingTxn && (
        <EditTransactionModal
          transaction={editingTxn}
          onSave={updateTransaction}
          onClose={() => setEditingTxn(null)}
        />
      )}
    </>
  );
};

export default Transactions;
