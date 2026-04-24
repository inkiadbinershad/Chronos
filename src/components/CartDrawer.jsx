import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, total, clearCart, showToast } = useCart();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(6px)',
              zIndex: 2000,
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: .45, ease: [0.25,0.46,0.45,0.94] }}
        style={{
          position: 'fixed', top: 0, right: 0, width: '420px', height: '100vh',
          background: 'var(--deep)', zIndex: 2001,
          borderLeft: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.8rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily:'var(--font-title)', fontSize:'.85rem', letterSpacing:'.25em', color:'var(--gold)' }}>
            Your Selection
          </span>
          <button onClick={() => setIsOpen(false)} style={{
            background:'none', border:'none', color:'var(--muted)', fontSize:'1.3rem', transition:'color .2s',
          }}
          onMouseEnter={e=>e.target.style.color='var(--gold)'}
          onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem' }}>
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center', padding: '4rem 1rem',
                  color: 'var(--muted)', fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem', fontStyle: 'italic',
                }}
              >
                Your cart is empty.<br /><br />Discover our timepieces.
              </motion.div>
            ) : cart.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                style={{
                  display: 'flex', gap: '1rem', padding: '1rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <img src={item.img} alt={item.name} style={{ width:70, height:70, objectFit:'cover', filter:'brightness(.85)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'.95rem', color:'var(--cream)', marginBottom:'.2rem' }}>{item.name}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--gold)' }}>
                    ${item.price.toLocaleString()} {item.qty > 1 && `× ${item.qty}`}
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{
                  background:'none', border:'none', color:'var(--muted)',
                  fontSize:'.8rem', alignSelf:'flex-start', transition:'color .2s', padding:'.2rem',
                }}
                onMouseEnter={e=>e.target.style.color='#e07070'}
                onMouseLeave={e=>e.target.style.color='var(--muted)'}
                >✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding:'1.5rem', borderTop:'1px solid var(--border)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.2rem', fontSize:'.82rem', color:'var(--cream)' }}>
              <span>Total</span>
              <span style={{ color:'var(--gold)', fontSize:'.95rem', fontFamily:'var(--font-display)' }}>${total.toLocaleString()}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={() => { showToast('Order submitted. Our concierge will contact you shortly.'); setIsOpen(false); clearCart(); }}
              style={{
                width:'100%', background:'var(--gold)', border:'none', color:'var(--espresso)',
                padding:'1rem', fontFamily:'var(--font-body)', fontSize:'.72rem',
                letterSpacing:'.25em', textTransform:'uppercase', fontWeight:500,
                transition:'background .3s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--gold-light)'}
              onMouseLeave={e=>e.currentTarget.style.background='var(--gold)'}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  );
}
