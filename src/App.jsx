import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';
import InfoModal from './components/InfoModal';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Mobile menu toggle */}
      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(true)}
        id="mobile-menu-toggle"
        aria-label="Open menu"
      >
        <FaBars />
      </button>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onOpenInfo={() => setInfoOpen(true)} 
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>

      <InfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
};

export default App;
