import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6, delay: index * .08, ease: [0.25,0.46,0.45,0.94] }}
      whileHover="hover"
      style={{ background: 'var(--mahogany)', position: 'relative', overflow: 'hidden' }}
    >
      {/* IMAGE WRAP */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1', background: 'var(--deep)' }}>
        {/* Shimmer while loading */}
        {!imgLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, var(--deep) 25%, var(--mahogany) 50%, var(--deep) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        )}

<motion.img
          src={product.img}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjkyNDI2Ii8+PHRleHQgeD0iNTAlIiB5PSI5MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OWIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            setImgLoaded(true);
          }}
          variants={{ hover: { scale: 1.07 } }}
          transition={{ duration: .65 }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0, transition: 'opacity .4s',
          }}
        />

        {/* DARK OVERLAY ON HOVER */}
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(12,7,4,.55)',
          }}
        />

        {/* QUICK ADD */}
        <motion.div
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: .3 }}
          style={{
            position: 'absolute', bottom: '1.2rem', left: '50%',
            transform: 'translateX(-50%)', whiteSpace: 'nowrap',
          }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            style={{
              background: 'var(--gold)', color: 'var(--espresso)',
              border: 'none', padding: '.65rem 1.6rem',
              fontFamily: 'var(--font-body)', fontSize: '.66rem',
              letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 500,
            }}
          >
            Add to Selection
          </motion.button>
        </motion.div>

        {/* WISHLIST */}
        <motion.button
          whileTap={{ scale: .85 }}
          onClick={() => setWishlist(w => !w)}
          style={{
            position: 'absolute', top: '.9rem', right: '.9rem',
            background: 'rgba(12,7,4,.6)', border: '1px solid var(--border)',
            width: '32px', height: '32px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: wishlist ? 'var(--gold)' : 'var(--muted)',
            fontSize: '.85rem', transition: 'color .3s',
          }}
        >
          {wishlist ? '♥' : '♡'}
        </motion.button>

        {/* BADGE */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: '.9rem', left: '.9rem',
            background: 'var(--gold)', color: 'var(--espresso)',
            padding: '.18rem .55rem', fontSize: '.56rem',
            letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700,
          }}>
            {product.badge}
          </div>
        )}
      </div>

      {/* INFO */}
      <div style={{ padding: '1.1rem' }}>
        <div style={{ fontSize:'.58rem', letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.3rem' }}>
          {product.brand}
        </div>
        <div style={{
          fontFamily:'var(--font-display)', fontSize:'1.1rem',
          fontWeight:400, color:'var(--cream)', marginBottom:'.4rem', lineHeight:1.3,
        }}>
          {product.name}
        </div>

        {/* STARS */}
        <div style={{ display:'flex', alignItems:'center', gap:'.4rem', marginBottom:'.5rem' }}>
          <span style={{ color:'var(--gold)', fontSize:'.7rem', letterSpacing:'.08em' }}>
            {'★'.repeat(Math.floor(product.rating))}
          </span>
          <span style={{ fontSize:'.65rem', color:'var(--muted)' }}>({product.reviews})</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'.8rem' }}>
          <span style={{ fontSize:'.88rem', color:'var(--gold-light)' }}>
            ${product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span style={{ fontSize:'.75rem', color:'var(--muted)', textDecoration:'line-through' }}>
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* HOVER BOTTOM LINE */}
      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', background: 'var(--gold)',
          transformOrigin: 'left',
        }}
      />

      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </motion.div>
  );
}
