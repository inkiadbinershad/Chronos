import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../data/index.js';

const FILTERS = [
  { key: 'all', label: 'All Pieces' },
  { key: 'classic', label: 'Classic' },
  { key: 'sport', label: 'Sport' },
  { key: 'ladies', label: 'Ladies' },
  { key: 'limited', label: 'Limited Edition' },
];

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const products = PRODUCTS;
  const [ref, inView] = useInView(0.1);

  const filtered = useMemo(() => {
    let list = filter === 'all' ? products : products.filter(p => p.category === filter);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, filter, sort]);


  return (
    <section id="shop" style={{ background: 'var(--deep)', padding: '6rem 5rem' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .8, ease: [0.25,0.46,0.45,0.94] }}
        style={{ marginBottom: '3rem' }}
      >
        <div className="label">The Boutique</div>
        <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', marginBottom: '.8rem' }}>
          Fine <em className="gold italic">Timepieces</em>
        </h2>
        <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.85, maxWidth:'480px' }}>
          Each piece is a masterwork of precision engineering and aesthetic refinement,
          bearing the Chronos hallmark of excellence.
        </p>
      </motion.div>

      {/* FILTERS + SORT */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', marginBottom:'2.5rem' }}>
        <div style={{ display:'flex', gap:'.7rem', flexWrap:'wrap' }}>
          {FILTERS.map(f => (
            <motion.button
              key={f.key}
              whileTap={{ scale: .96 }}
              onClick={() => setFilter(f.key)}
              style={{
                background: filter === f.key ? 'rgba(201,169,110,.12)' : 'none',
                border: `1px solid ${filter === f.key ? 'var(--gold)' : 'rgba(201,169,110,.2)'}`,
                color: filter === f.key ? 'var(--gold)' : 'var(--muted)',
                padding: '.45rem 1.2rem',
                fontFamily: 'var(--font-body)', fontSize: '.66rem',
                letterSpacing: '.2em', textTransform: 'uppercase',
                transition: 'all .3s',
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            background: 'var(--mahogany)', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '.45rem 1rem',
            fontFamily: 'var(--font-body)', fontSize: '.68rem',
            letterSpacing: '.12em', outline: 'none',
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* GRID */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .35 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '1.2rem',
          }}
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <style>{`
        @media(max-width:1100px){div[style*='repeat(4,1fr)']{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){div[style*='repeat(4,1fr)']{grid-template-columns:repeat(2,1fr)!important;padding:3rem 1.5rem!important;}}
        @media(max-width:500px){div[style*='repeat(4,1fr)']{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
