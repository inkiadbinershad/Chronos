import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-chr-dark border-t border-chr-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-chr-gold/40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gold-gradient" />
              </div>
              <span className="font-playfair text-xl font-bold tracking-[0.25em] text-chr-gold-pale">CHRONOS</span>
            </div>
            <p className="font-raleway text-chr-muted text-sm leading-relaxed max-w-xs">
              Crafting timepieces that transcend generations. Each CHRONOS watch is a testament to the artistry of human hands and the precision of Swiss engineering.
            </p>
            <div className="flex gap-4 mt-6">
              {['Instagram', 'Facebook', 'Twitter'].map(soc => (
                <button key={soc} className="w-8 h-8 rounded-full border border-chr-faint flex items-center justify-center text-chr-muted hover:border-chr-gold hover:text-chr-gold transition-all duration-300 text-xs">
                  {soc[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Collection */}
          <div>
            <h4 className="font-raleway text-[10px] tracking-[0.3em] uppercase text-chr-gold mb-4">Collection</h4>
            <ul className="space-y-2">
              {['Military Heritage', 'Contemporary', 'Ultra Luxury', 'Limited Editions'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="font-raleway text-chr-muted text-sm hover:text-chr-gold-light transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-raleway text-[10px] tracking-[0.3em] uppercase text-chr-gold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Story', 'Craftsmanship', 'Contact'].map(item => (
                <li key={item}>
                  <Link to="/" className="font-raleway text-chr-muted text-sm hover:text-chr-gold-light transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-sep mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-raleway text-chr-muted text-xs tracking-widest">
            © 2024 CHRONOS TIMEPIECES. ALL RIGHTS RESERVED.
          </p>
          <p className="font-raleway text-chr-faint text-xs tracking-widest">
            ESTABLISHED 1924 · SWITZERLAND
          </p>
        </div>
      </div>
    </footer>
  );
}
