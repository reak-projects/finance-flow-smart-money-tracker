import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartPie,
  FaExchangeAlt,
  FaPlusCircle,
  FaWallet,
  FaChartLine,
  FaInfoCircle,
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, onOpenInfo }) => {
  const links = [
    { to: '/', label: 'Dashboard', icon: <FaChartPie /> },
    { to: '/transactions', label: 'Transactions', icon: <FaExchangeAlt /> },
    { to: '/transactions/new', label: 'Add Transaction', icon: <FaPlusCircle /> },
    { to: '/budget', label: 'Budget', icon: <FaWallet /> },
    { to: '/analytics', label: 'Analytics', icon: <FaChartLine /> },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">💰</div>
          <div>
            <h1>FinanceFlow</h1>
            <div className="brand-tag">Smart Money Tracker</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-label">Menu</span>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
              id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div style={{
          padding: 'var(--space-lg)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)'
        }}>
          <button 
            onClick={() => { onClose(); onOpenInfo(); }} 
            className="btn btn-secondary" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <FaInfoCircle /> App Guide
          </button>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.1))',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🎯</div>
            <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Track every rupee,<br />build your wealth
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
