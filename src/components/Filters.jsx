import React from 'react';
import { CATEGORIES } from '../utils/constants';

const Filters = ({
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  return (
    <>
      <select
        id="filter-category"
        className="filter-select"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
        <option value="Salary">Salary</option>
        <option value="Freelance">Freelance</option>
        <option value="Other">Other</option>
      </select>

      <select
        id="filter-type"
        className="filter-select"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        id="sort-by"
        className="filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Amount: High → Low</option>
        <option value="amount-asc">Amount: Low → High</option>
        <option value="category">Category A–Z</option>
      </select>

      <input
        id="filter-date-from"
        type="date"
        className="filter-select"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        title="From date"
      />
      <input
        id="filter-date-to"
        type="date"
        className="filter-select"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        title="To date"
      />
    </>
  );
};

export default Filters;
