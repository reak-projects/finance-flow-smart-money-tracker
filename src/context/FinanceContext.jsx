import React, { createContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { SEED_TRANSACTIONS } from '../utils/constants';

export const FinanceContext = createContext();

const STORAGE_KEY = 'financeflow_transactions';
const BUDGET_KEY = 'financeflow_budget';

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage(STORAGE_KEY, SEED_TRANSACTIONS)
  );
  const [budget, setBudgetState] = useState(() =>
    loadFromStorage(BUDGET_KEY, 50000)
  );

  // Persist transactions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Persist budget
  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  }, [budget]);

  const addTransaction = useCallback((data) => {
    const newTxn = { ...data, id: uuidv4() };
    setTransactions((prev) => [newTxn, ...prev]);
    toast.success('Transaction added!');
    return newTxn;
  }, []);

  const updateTransaction = useCallback((id, data) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
    toast.success('Transaction updated!');
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.info('Transaction deleted');
  }, []);

  const setBudget = useCallback((amount) => {
    setBudgetState(amount);
    toast.success('Budget updated!');
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        budget,
        setBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
