import {
  FaUtensils,
  FaPlane,
  FaHome,
  FaShoppingBag,
  FaGamepad,
  FaHeartbeat,
  FaBolt,
  FaCreditCard,
  FaMoneyBillWave,
  FaLaptopCode,
  FaEllipsisH,
} from 'react-icons/fa';

export const CATEGORIES = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
];

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Other'];

export const ALL_CATEGORIES = [...CATEGORIES, ...INCOME_CATEGORIES];

export const CATEGORY_CONFIG = {
  Food:           { icon: FaUtensils,      color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  Travel:         { icon: FaPlane,          color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
  Rent:           { icon: FaHome,           color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  Shopping:       { icon: FaShoppingBag,    color: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
  Entertainment:  { icon: FaGamepad,        color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  Health:         { icon: FaHeartbeat,      color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  Utilities:      { icon: FaBolt,           color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  Subscriptions:  { icon: FaCreditCard,     color: '#22d3ee', bg: 'rgba(34,211,238,0.12)' },
  Salary:         { icon: FaMoneyBillWave,  color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  Freelance:      { icon: FaLaptopCode,     color: '#c084fc', bg: 'rgba(192,132,252,0.12)' },
  Other:          { icon: FaEllipsisH,      color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
};

export const CHART_COLORS = [
  '#6366f1', '#22d3ee', '#f472b6', '#fbbf24',
  '#34d399', '#fb923c', '#a78bfa', '#38bdf8',
];

/**
 * Seed data so the app never starts totally empty.
 */
export const SEED_TRANSACTIONS = [
  { id: 'seed-1', title: 'Monthly Salary',         amount: 55000, category: 'Salary',         type: 'income',  date: '2026-03-01', notes: 'March salary',       recurring: true  },
  { id: 'seed-2', title: 'Freelance Project',      amount: 12000, category: 'Freelance',      type: 'income',  date: '2026-03-05', notes: 'Logo design gig',    recurring: false },
  { id: 'seed-3', title: 'House Rent',             amount: 15000, category: 'Rent',            type: 'expense', date: '2026-03-01', notes: '',                   recurring: true  },
  { id: 'seed-4', title: 'Grocery Shopping',       amount: 3500,  category: 'Food',            type: 'expense', date: '2026-03-03', notes: 'Weekly groceries',   recurring: false },
  { id: 'seed-5', title: 'Netflix Subscription',   amount: 649,   category: 'Subscriptions',   type: 'expense', date: '2026-03-02', notes: 'Monthly plan',       recurring: true  },
  { id: 'seed-6', title: 'Electricity Bill',       amount: 2200,  category: 'Utilities',       type: 'expense', date: '2026-03-05', notes: 'March bill',         recurring: true  },
  { id: 'seed-7', title: 'Weekend Trip',           amount: 4500,  category: 'Travel',          type: 'expense', date: '2026-03-08', notes: 'Goa weekend',        recurring: false },
  { id: 'seed-8', title: 'Gym Membership',         amount: 1500,  category: 'Health',          type: 'expense', date: '2026-03-01', notes: '',                   recurring: true  },
  { id: 'seed-9', title: 'New Headphones',         amount: 2999,  category: 'Shopping',        type: 'expense', date: '2026-03-10', notes: 'Sony WH-1000XM5',   recurring: false },
  { id: 'seed-10', title: 'Movie Night',           amount: 800,   category: 'Entertainment',   type: 'expense', date: '2026-03-12', notes: 'PVR IMAX',          recurring: false },
  { id: 'seed-11', title: 'Dining Out',            amount: 1200,  category: 'Food',            type: 'expense', date: '2026-03-14', notes: 'Italian restaurant', recurring: false },
  { id: 'seed-12', title: 'Spotify',               amount: 119,   category: 'Subscriptions',   type: 'expense', date: '2026-03-02', notes: 'Premium plan',       recurring: true  },
  { id: 'seed-13', title: 'Freelance Tutoring',    amount: 5000,  category: 'Freelance',       type: 'income',  date: '2026-03-15', notes: 'Java tutoring',      recurring: false },
  { id: 'seed-14', title: 'Medicines',             amount: 850,   category: 'Health',          type: 'expense', date: '2026-03-16', notes: 'Monthly meds',       recurring: true  },
  { id: 'seed-15', title: 'Uber Rides',            amount: 1600,  category: 'Travel',          type: 'expense', date: '2026-03-18', notes: 'Weekly commute',     recurring: false },
  { id: 'seed-16', title: 'Clothes Shopping',      amount: 3200,  category: 'Shopping',        type: 'expense', date: '2026-03-20', notes: 'Summer sale',        recurring: false },
  { id: 'seed-17', title: 'Swiggy Orders',         amount: 2100,  category: 'Food',            type: 'expense', date: '2026-03-22', notes: 'Various orders',     recurring: false },
  { id: 'seed-18', title: 'Internet Bill',         amount: 999,   category: 'Utilities',       type: 'expense', date: '2026-03-05', notes: 'Fiber plan',         recurring: true  },
  // Some older months for trend chart
  { id: 'seed-19', title: 'January Salary',        amount: 55000, category: 'Salary',          type: 'income',  date: '2026-01-01', notes: '',                   recurring: true  },
  { id: 'seed-20', title: 'Jan Rent',              amount: 15000, category: 'Rent',            type: 'expense', date: '2026-01-01', notes: '',                   recurring: true  },
  { id: 'seed-21', title: 'Jan Food',              amount: 6000,  category: 'Food',            type: 'expense', date: '2026-01-10', notes: '',                   recurring: false },
  { id: 'seed-22', title: 'Jan Shopping',          amount: 4000,  category: 'Shopping',        type: 'expense', date: '2026-01-15', notes: '',                   recurring: false },
  { id: 'seed-23', title: 'February Salary',       amount: 55000, category: 'Salary',          type: 'income',  date: '2026-02-01', notes: '',                   recurring: true  },
  { id: 'seed-24', title: 'Feb Rent',              amount: 15000, category: 'Rent',            type: 'expense', date: '2026-02-01', notes: '',                   recurring: true  },
  { id: 'seed-25', title: 'Feb Entertainment',     amount: 3500,  category: 'Entertainment',   type: 'expense', date: '2026-02-14', notes: 'Valentine outing',   recurring: false },
  { id: 'seed-26', title: 'Feb Food',              amount: 5500,  category: 'Food',            type: 'expense', date: '2026-02-20', notes: '',                   recurring: false },
];
