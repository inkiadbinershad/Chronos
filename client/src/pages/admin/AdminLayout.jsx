import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/admin/products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { to: '/admin/orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { to: '/admin/customers', label: 'Customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-chr-black flex">
      {/* Sidebar */}
      <div className={`admin-sidebar flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'} hidden md:flex flex-col`}>
        <div className="h-16 flex items-center px-4 border-b border-chr-gold/10 gap-3">
          <div className="w-6 h-6 rounded-full border border-chr-gold/40 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-gold-gradient" />
          </div>
          {sidebarOpen && <span className="font-playfair text-sm font-bold tracking-[0.2em] text-chr-gold-pale">CHRONOS</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const active = item.to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 group ${
                  active ? 'bg-chr-gold/10 text-chr-gold border border-chr-gold/20' : 'text-chr-muted hover:text-chr-cream hover:bg-white/4'
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                {sidebarOpen && <span className="font-raleway text-xs tracking-wide">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-chr-gold/10">
          <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-chr-muted hover:text-chr-gold transition-colors`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {sidebarOpen && <span className="font-raleway text-xs tracking-wide">Back to Store</span>}
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-16 nav-glass flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(s => !s)} className="hidden md:block text-chr-muted hover:text-chr-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-raleway text-chr-cream text-sm tracking-widest uppercase">
              {navItems.find(n => n.to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(n.to))?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-raleway text-chr-muted text-xs">Admin</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
