import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const NAV = [
  { path: '/admin', label: 'Dashboard', icon: '⊞', end: true },
  { path: '/admin/products', label: 'Products', icon: '◫' },
  { path: '/admin/orders', label: 'Orders', icon: '◻' },
  { path: '/admin/users', label: 'Users', icon: '◉' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--espresso)', overflow: 'hidden' }}>
      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: .35, ease: [0.25,0.46,0.45,0.94] }}
        style={{
          background: 'var(--deep)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', flexShrink: 0,
        }}
      >
        {/* LOGO ROW */}
        <div style={{
          padding: collapsed ? '1.4rem .9rem' : '1.4rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          minHeight: '64px',
        }}>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily:'var(--font-title)', fontSize:'.85rem', letterSpacing:'.3em', color:'var(--gold)' }}
              >
                CHRONOS
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{ background:'none', border:'none', color:'var(--muted)', fontSize:'1rem', transition:'color .2s', flexShrink:0 }}
            onMouseEnter={e=>e.target.style.color='var(--gold)'}
            onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* NAV LINKS */}
        <nav style={{ flex: 1, padding: '.8rem 0' }}>
          {NAV.map(n => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center',
                gap: '.9rem',
                padding: collapsed ? '.8rem' : '.75rem 1.5rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                color: isActive ? 'var(--gold)' : 'var(--muted)',
                background: isActive ? 'rgba(201,169,110,.08)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase',
                transition: 'all .25s', textDecoration: 'none',
              })}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{n.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .2 }}
                  >
                    {n.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* BACK TO STORE */}
        <div style={{ padding: '.8rem', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%', background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              padding: collapsed ? '.6rem' : '.6rem 1rem',
              fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase',
              transition: 'all .3s', display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start', gap: '.6rem',
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';}}
          >
            <span>↖</span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                  Exit to Store
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => {
              useAuthStore.getState().logoutAdmin();
              navigate('/admin/login');
            }}
            style={{
              width: '100%', background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              padding: collapsed ? '.6rem' : '.6rem 1rem',
              fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase',
              transition: 'all .3s', display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start', gap: '.6rem',
              marginTop: '0.25rem',
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.borderColor = 'rgba(224,112,112,0.5)';
              e.currentTarget.style.color = '#e07070';
              e.currentTarget.style.background = 'rgba(224,112,112,0.05)';
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'none';
            }}
          >
            <span>🚪</span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* MAIN */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* TOP BAR */}
        <div style={{
          padding: '0 2rem', height: '64px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--deep)', flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none',
              color: 'var(--gold)', fontSize: '.72rem', letterSpacing: '.25em',
              textTransform: 'uppercase', cursor: 'pointer', padding: '0 .5rem',
              transition: 'color .3s',
            }}
            onMouseEnter={(e) => { e.target.style.color = '#e8a84e'; }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--gold)'; }}
          >
            ← Back to Store
          </button>
          <div style={{ fontSize: '.72rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Admin Dashboard
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <div style={{ fontSize:'.7rem', color:'var(--muted)' }}>Dec 12, 2024</div>
            <div style={{
              width:'34px', height:'34px', border:'1px solid var(--border)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'.7rem', color:'var(--gold)',
            }}>A</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
