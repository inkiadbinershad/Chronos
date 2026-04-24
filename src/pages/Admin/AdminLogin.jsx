import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginAdmin = useAuthStore((state) => state.loginAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin@chronos.com' && password === 'admin123') {
      loginAdmin();
      setTimeout(() => navigate('/admin'), 200);
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--deep) 0%, #0a0e1a 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: 'var(--mahogany)',
          border: '1px solid rgba(201,169,110,0.15)',
          backdropFilter: 'blur(20px)',
          padding: '3rem 2.5rem',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px', height: '64px', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--gold), #d4b373)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', color: 'var(--deep)',
            boxShadow: '0 8px 24px rgba(201, 169, 110, 0.3)',
          }}>
            ⊚
          </div>
          <div style={{
            fontFamily: 'var(--font-title)', fontSize: '1.6rem',
            letterSpacing: '0.1em', color: 'var(--gold)',
            marginBottom: '0.5rem',
          }}>
            CHRONOS
          </div>
          <div style={{
            fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(201,169,110,0.7)',
            fontWeight: 500,
          }}>
            Admin Access
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="email"
              placeholder="admin@chronos.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', background: 'var(--deep)',
                border: '1px solid var(--border)', color: 'var(--cream)',
                padding: '1rem 1.2rem', fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', borderRadius: '6px', outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--gold)';
                e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1.8rem' }}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', background: 'var(--deep)',
                border: '1px solid var(--border)', color: 'var(--cream)',
                padding: '1rem 1.2rem', fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', borderRadius: '6px', outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--gold)';
                e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                background: 'rgba(220,80,80,0.15)',
                border: '1px solid rgba(220,80,80,0.4)',
                color: '#e07070',
                padding: '0.8rem 1rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                marginBottom: '1rem',
              }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              background: 'var(--gold)',
              color: 'var(--deep)',
              border: 'none',
              padding: '1.1rem',
              fontFamily: 'var(--font-title)',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>
      </motion.div>
    </motion.main>
  );
}

