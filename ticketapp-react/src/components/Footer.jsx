import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#1f2937', color: 'white', padding: '32px 20px',
      marginTop: 60, textAlign: 'center'
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div>© {new Date().getFullYear()} TicketApp. All rights reserved.</div>
        <div style={{ color: '#9ca3af', marginTop: 8 }}>
          Built with accessibility & responsiveness in mind
        </div>
      </div>
    </footer>
  );
}
