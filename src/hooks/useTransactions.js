import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';

/**
 * Hook that exposes CRUD operations and computed analytics.
 */
export const useTransactions = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useContext(FinanceContext);

  const analytics = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    // Category-wise spending
    const categoryMap = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });

    const categoryData = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const topCategory = categoryData.length > 0 ? categoryData[0].name : '—';

    // Monthly trend (last 6 months)
    const monthlyMap = {};
    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyMap[key]) monthlyMap[key] = { income: 0, expense: 0 };
      if (t.type === 'income') monthlyMap[key].income += t.amount;
      else monthlyMap[key].expense += t.amount;
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTrend = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([key, val]) => {
        const [, m] = key.split('-');
        return { month: monthNames[parseInt(m, 10) - 1], income: val.income, expense: val.expense };
      });

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      categoryData,
      topCategory,
      monthlyTrend,
    };
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    ...analytics,
  };
};
