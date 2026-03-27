import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange, placeholder = 'Search transactions...' }) => {
  return (
    <div className="search-box">
      <FaSearch />
      <input
        id="search-transactions"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
