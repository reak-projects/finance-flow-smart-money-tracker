import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';

/**
 * Hook for budget-related calculations.
 */
export const useBudget = () => {
  const { transactions, budget, setBudget } = useContext(FinanceContext);

  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === 'expense' &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = budget - monthlyExpenses;
    const percentage = budget > 0 ? Math.min((monthlyExpenses / budget) * 100, 100) : 0;

    return {
      monthlyBudget: budget,
      totalSpent: monthlyExpenses,
      remaining,
      percentage: Math.round(percentage * 10) / 10,
      isOverBudget: remaining < 0,
    };
  }, [transactions, budget]);

  return { ...stats, setBudget };
};
