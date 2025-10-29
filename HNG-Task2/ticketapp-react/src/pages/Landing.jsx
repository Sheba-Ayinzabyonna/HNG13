import React from "react";

export default function Landing({ onNavigate }) {
  return (
    <>
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #006400 30%, #ff6347 100%)',
        color: 'white',
        padding: '100px 20px 200px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: 50,
          left: -50
        }} />
        <div style={{
          position: 'absolute',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          bottom: 100,
          right: -30
        }} />

        <div style={{
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 40,
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ maxWidth: 550 }}>
            <h1 style={{ fontSize: '3rem', marginBottom: 20 }}>
              Manage Your Tickets with Ease
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: 30, opacity: 0.9 }}>
              Track, organize, and resolve tickets efficiently. Built for teams that value simplicity and speed.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate('login')}
                style={{
                  background: 'white',
                  color: '#006400',
                  padding: '14px 32px',
                  borderRadius: 30,
                  border: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  cursor: 'pointer'
                }}>
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: 30,
                  border: '2px solid white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                Get Started
              </button>
            </div>
          </div>
          <div style={{
            width: 400,
            height: 300,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80
          }}>
            🎫
          </div>
        </div>

        <svg style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 100
        }} viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </section>

      <section style={{
        maxWidth: 1440,
        margin: '60px auto',
        padding: '0 20px'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 40 }}>
          Why Choose TicketApp?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {[
            { title: 'Easy to Use', desc: 'Intuitive interface designed for quick ticket management' },
            { title: 'Fully Responsive', desc: 'Works seamlessly on desktop, tablet, and mobile devices' },
            { title: 'Secure & Reliable', desc: 'Your data is protected with industry-standard security' }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'white',
              padding: 32,
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 12, color: '#006400' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6b7280' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
