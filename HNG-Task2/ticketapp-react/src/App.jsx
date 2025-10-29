import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import { authService } from './services/authService';
import { toastEmitter } from './utils/toastEmitter';

// ✅ Wrapper component to handle route protection and navigation
function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const navigate = useNavigate();

  useEffect(() => {
    const session = authService.getSession();
    if (!session && (currentPage === 'dashboard' || currentPage === 'tickets')) {
      toastEmitter.emit("Please log in to access this page", 'error');
      setCurrentPage('login');
      navigate('/login');
    }
  }, [currentPage, navigate]);

  function handleNavigate(page) {
    const session = authService.getSession();
    if ((page === 'dashboard' || page === 'tickets') && !session) {
      toastEmitter.emit("Your session has expired — please log in again", 'error');
      setCurrentPage('login');
      navigate('/login');
      return;
    }
    setCurrentPage(page);
    navigate(page === 'landing' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <Toast />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing onNavigate={handleNavigate} />} />
          <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
          <Route path="/signup" element={<Signup onNavigate={handleNavigate} />} />
          <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
