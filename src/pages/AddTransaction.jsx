import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { useTransactions } from '../hooks/useTransactions';
import { CATEGORIES, INCOME_CATEGORIES } from '../utils/constants';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(2, 'At least 2 characters'),
  amount: yup
    .number()
    .typeError('Enter a valid amount')
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: yup.string().required('Pick a category'),
  type: yup.string().oneOf(['income', 'expense']).required(),
  date: yup.string().required('Date is required'),
  notes: yup.string(),
  recurring: yup.boolean(),
});

const AddTransaction = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      recurring: false,
    },
  });

  const currentType = watch('type');
  const categories = currentType === 'income' ? INCOME_CATEGORIES : CATEGORIES;

  useEffect(() => {
    const cat = watch('category');
    if (!categories.includes(cat)) {
      setValue('category', categories[0]);
    }
  }, [currentType]);

  const onSubmit = (data) => {
    addTransaction({ ...data, amount: Number(data.amount) });
    reset();
    navigate('/transactions');
  };

  return (
    <>
      <div className="page-header">
        <h1>Add Transaction</h1>
        <p>Record a new income or expense</p>
      </div>

      <div className="page-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ maxWidth: 600 }}
        >
          <div className="card" style={{ padding: 'var(--space-xl)' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Type Toggle */}
              <div className="form-group">
                <label>Transaction Type</label>
                <div className="type-toggle">
                  <button
                    type="button"
                    className={currentType === 'income' ? 'active-income' : ''}
                    onClick={() => setValue('type', 'income')}
                    id="type-income"
                  >
                    💰 Income
                  </button>
                  <button
                    type="button"
                    className={currentType === 'expense' ? 'active-expense' : ''}
                    onClick={() => setValue('type', 'expense')}
                    id="type-expense"
                  >
                    💸 Expense
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label htmlFor="txn-title">Title</label>
                <input
                  id="txn-title"
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  placeholder="e.g. Monthly Salary, Grocery Shopping"
                  {...register('title')}
                />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>

              {/* Amount & Category */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="txn-amount">Amount (₹)</label>
                  <input
                    id="txn-amount"
                    type="number"
                    className={`form-input ${errors.amount ? 'error' : ''}`}
                    placeholder="5000"
                    {...register('amount')}
                  />
                  {errors.amount && <p className="form-error">{errors.amount.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="txn-category">Category</label>
                  <select
                    id="txn-category"
                    className={`form-select ${errors.category ? 'error' : ''}`}
                    {...register('category')}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && <p className="form-error">{errors.category.message}</p>}
                </div>
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="txn-date">Date</label>
                <input
                  id="txn-date"
                  type="date"
                  className={`form-input ${errors.date ? 'error' : ''}`}
                  {...register('date')}
                />
                {errors.date && <p className="form-error">{errors.date.message}</p>}
              </div>

              {/* Notes */}
              <div className="form-group">
                <label htmlFor="txn-notes">Notes (optional)</label>
                <textarea
                  id="txn-notes"
                  className="form-textarea"
                  rows={3}
                  placeholder="Add any notes about this transaction..."
                  {...register('notes')}
                />
              </div>

              {/* Recurring */}
              <div className="form-group">
                <label className="form-checkbox">
                  <input type="checkbox" id="txn-recurring" {...register('recurring')} />
                  <span>This is a recurring transaction</span>
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                  id="btn-back"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                  id="btn-save-transaction"
                  style={{ flex: 1 }}
                >
                  <FaSave /> Save Transaction
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AddTransaction;
