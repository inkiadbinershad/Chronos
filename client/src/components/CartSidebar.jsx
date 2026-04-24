import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { items, removeItem, updateQty, total, isOpen, setIsOpen } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brown-950/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] glass-dark border-l border-gold-600/15 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold-600/10">
              <div>
                <h2 className="font-display text-xl text-cream">Your Selection</h2>
                <p className="text-cream-dim/40 text-xs tracking-widest uppercase mt-0.5">{items.length} piece{items.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 border border-gold-600/20 rounded-full flex items-center justify-center hover:border-gold-500/60 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-cream-dim/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <span className="text-5xl opacity-10">⌚</span>
                  <p className="text-cream-dim/40 font-body text-sm">Your collection awaits.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-ghost px-6 py-2.5 text-xs tracking-widest"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item._id}
                    layout
                    exit={{ opacity: 0, x: 40 }}
                    className="glass rounded-sm p-4 flex gap-4"
                  >
                    <div className="w-20 h-20 bg-brown-900 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.6rem] tracking-widest uppercase text-gold-600/60">{item.brand}</p>
                      <h4 className="font-display text-sm text-cream truncate">{item.name}</h4>
                      <p className="text-gold-gradient font-body text-sm font-semibold mt-1">${item.price.toLocaleString()}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gold-600/20 rounded-sm">
                          <button onClick={() => updateQty(item._id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-cream-dim/50 hover:text-gold-500 transition-colors text-xs">−</button>
                          <span className="w-7 h-7 flex items-center justify-center text-xs text-cream font-body">{item.quantity}</span>
                          <button onClick={() => updateQty(item._id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-cream-dim/50 hover:text-gold-500 transition-colors text-xs">+</button>
                        </div>
                        <button onClick={() => removeItem(item._id)} className="text-cream-dim/30 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gold-600/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cream-dim/50 text-sm font-body uppercase tracking-widest">Subtotal</span>
                  <span className="font-display text-xl text-gold-gradient">${total.toLocaleString()}</span>
                </div>
                <p className="text-cream-dim/30 text-xs font-body">Shipping and taxes calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold block text-center py-4 w-full tracking-widest"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-ghost w-full py-3 text-xs tracking-widest"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
