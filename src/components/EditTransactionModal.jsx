import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import { CATEGORIES, INCOME_CATEGORIES } from '../utils/constants';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(2, 'At least 2 characters'),
  amount: yup.number().typeError('Enter a valid amount').positive('Must be positive').required('Amount is required'),
  category: yup.string().required('Pick a category'),
  type: yup.string().oneOf(['income', 'expense']).required(),
  date: yup.string().required('Date is required'),
  notes: yup.string(),
  recurring: yup.boolean(),
});

const EditTransactionModal = ({ transaction, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
      notes: transaction.notes || '',
      recurring: transaction.recurring || false,
    },
  });

  const currentType = watch('type');
  const categories = currentType === 'income' ? INCOME_CATEGORIES : CATEGORIES;

  useEffect(() => {
    // Reset category when type changes if current category doesn't belong
    const cat = watch('category');
    if (!categories.includes(cat)) {
      setValue('category', categories[0]);
    }
  }, [currentType]);

  const onSubmit = (data) => {
    onSave(transaction.id, { ...data, amount: Number(data.amount) });
    onClose();
  };

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
            <h2>Edit Transaction</h2>
            <button className="modal-close" onClick={onClose} id="close-edit-modal">
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Type Toggle */}
            <div className="form-group">
              <label>Type</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={currentType === 'income' ? 'active-income' : ''}
                  onClick={() => setValue('type', 'income')}
                >
                  💰 Income
                </button>
                <button
                  type="button"
                  className={currentType === 'expense' ? 'active-expense' : ''}
                  onClick={() => setValue('type', 'expense')}
                >
                  💸 Expense
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                {...register('title')}
              />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-amount">Amount (₹)</label>
                <input
                  id="edit-amount"
                  type="number"
                  className={`form-input ${errors.amount ? 'error' : ''}`}
                  {...register('amount')}
                />
                {errors.amount && <p className="form-error">{errors.amount.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
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

            <div className="form-group">
              <label htmlFor="edit-date">Date</label>
              <input
                id="edit-date"
                type="date"
                className={`form-input ${errors.date ? 'error' : ''}`}
                {...register('date')}
              />
              {errors.date && <p className="form-error">{errors.date.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-notes">Notes</label>
              <textarea
                id="edit-notes"
                className="form-textarea"
                rows={3}
                {...register('notes')}
              />
            </div>

            <label className="form-checkbox">
              <input type="checkbox" {...register('recurring')} />
              <span>Mark as recurring</span>
            </label>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditTransactionModal;
