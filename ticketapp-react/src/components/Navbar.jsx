import React from 'react';
import { authService } from '../services/authService';
import { toastEmitter } from '../utils/toastEmitter';

export default function Navbar({ currentPage, onNavigate }) {
  const session = authService.getSession();

  function handleLogout() {
    authService.clearSession();
    toastEmitter.emit("Logged out successfully");
    onNavigate('landing');
  }

  return (
    <header style={{
      background: '#006400', color: 'white', padding: '16px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: '0 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <button onClick={() => onNavigate('landing')}
          style={{ fontSize: 24, fontWeight: 'bold', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
          TicketApp
        </button>
        <nav style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => onNavigate('landing')} style={btn}>Home</button>
          {session && <>
            <button onClick={() => onNavigate('dashboard')} style={btn}>Dashboard</button>
            <button onClick={() => onNavigate('tickets')} style={btn}>Tickets</button>
          </>}
        </nav>
        <div>
          {!session ? (
            <button onClick={() => onNavigate('login')} style={cta}>Login</button>
          ) : (
            <button onClick={handleLogout} style={cta}>Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}

const btn = {
  color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16
};

const cta = {
  background: '#ff6347', color: 'white', padding: '8px 20px',
  borderRadius: 20, border: 'none', fontWeight: 600, cursor: 'pointer'
};
