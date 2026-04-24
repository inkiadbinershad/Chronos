import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const TICKER_ITEMS = [
  'Free Shipping on Orders Over $500',
  '★ Certified Swiss Chronometer',
  'Lifetime Warranty on All Timepieces',
  'New Arrivals: The Eclipse Collection',
  'Complimentary Gift Wrapping',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setIsOpen } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { href: '#collections', label: 'Collections' },
    { href: '#shop', label: 'Shop' },
    { href: '#craftsmanship', label: 'Heritage' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* TICKER */}
      <div style={{
        background: 'var(--gold)', padding: '.42rem 0',
        overflow: 'hidden', position: 'fixed', top: 0, width: '100%', zIndex: 1001,
      }}>
        <div style={{
          display: 'flex', gap: '4rem', width: 'max-content',
          animation: 'ticker 30s linear infinite',
        }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-title)', fontSize: '.6rem',
              letterSpacing: '.25em', color: 'var(--espresso)', fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7, delay: .2, ease: [0.25,0.46,0.45,0.94] }}
        style={{
          position: 'fixed', top: '28px', width: '100%', zIndex: 1000,
          padding: scrolled ? '.9rem 4rem' : '1.4rem 4rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(12,7,4,.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all .4s ease',
        }}
      >
        <Link to="/" style={{
          fontFamily: 'var(--font-title)', fontSize: '1.3rem',
          letterSpacing: '.38em', color: 'var(--gold)', fontWeight: 600,
        }}>CHRONOS</Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}
            className="desktop-nav">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: 'var(--gold-pale)', fontSize: '.72rem',
                letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 400,
                transition: 'color .3s', position: 'relative',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--gold-pale)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            style={{
              background: 'none', border: '1px solid var(--border-hover)',
              color: 'var(--gold)', padding: '.45rem 1.2rem',
              fontSize: '.68rem', letterSpacing: '.2em',
              textTransform: 'uppercase', transition: 'all .3s',
              position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--espresso)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--gold)'; }}
          >
            Cart
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    background: 'var(--gold)', color: 'var(--espresso)',
                    width: '18px', height: '18px', borderRadius: '50%',
                    fontSize: '.6rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >{count}</motion.span>
              )}
            </AnimatePresence>
          </motion.button>



          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: 'none', background:'none', border:'none', color:'var(--cream)', fontSize:'1.3rem' }}
            className="mobile-menu-btn"
          >{mobileOpen ? '✕' : '☰'}</button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '78px', left: 0, right: 0,
              background: 'rgba(12,7,4,.97)', padding: '2rem',
              zIndex: 999, borderBottom: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: 'var(--gold-pale)', fontSize: '.85rem',
                  letterSpacing: '.22em', textTransform: 'uppercase',
                }}
              >{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:900px){
          .desktop-nav{display:none!important;}
          .mobile-menu-btn{display:block!important;}
          nav{padding:1rem 2rem!important;}
        }
      `}</style>
    </>
  );
}
