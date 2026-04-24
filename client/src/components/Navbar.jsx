import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHome || isAdmin ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-chr-gold/40 flex items-center justify-center group-hover:border-chr-gold transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-gold-gradient" />
          </div>
          <span className="font-playfair text-xl font-bold tracking-[0.25em] text-chr-gold-pale">CHRONOS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/shop', 'Collection'], ['/shop', 'About']].map(([path, label], i) => (
            <Link
              key={i}
              to={path}
              className={`font-raleway text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-chr-gold ${location.pathname === path && i !== 2 ? 'text-chr-gold' : 'text-chr-muted'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <svg className="w-5 h-5 text-chr-muted group-hover:text-chr-gold transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-gradient text-chr-black text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <Link to="/admin" className="hidden md:block btn-outline px-4 py-2 text-[10px] rounded">
            Admin
          </Link>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(m => !m)} className="md:hidden text-chr-muted hover:text-chr-gold transition-colors p-1">
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-64' : 'max-h-0'} nav-glass`}>
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-chr-gold/10">
          {[['/', 'Home'], ['/shop', 'Collection'], ['/admin', 'Admin Panel']].map(([path, label], i) => (
            <Link key={i} to={path} className="font-raleway text-xs tracking-[0.2em] uppercase text-chr-muted hover:text-chr-gold transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
