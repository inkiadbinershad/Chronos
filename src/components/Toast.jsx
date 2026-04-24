import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed', bottom: '5rem', right: '2rem',
            background: 'var(--mahogany)', border: '1px solid var(--border-hover)',
            color: 'var(--cream)', padding: '.9rem 1.5rem',
            fontFamily: 'var(--font-body)', fontSize: '.78rem',
            letterSpacing: '.1em', zIndex: 5000,
            display: 'flex', alignItems: 'center', gap: '.6rem',
          }}
        >
          <span style={{ color: 'var(--gold)' }}>✦</span>
          {toast.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
