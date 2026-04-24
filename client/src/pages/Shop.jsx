import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fallbackProducts = [
  { _id: '1', name: 'Field Commander', shortDesc: 'Military Heritage · Steel Case · Brown Leather', price: 4200, image: '/images/field-commander.jpg', category: 'military', rating: 4.9, reviewCount: 186, inStock: true, stockCount: 24 },
  { _id: '2', name: 'Filwd Chronograph', shortDesc: 'Contemporary Edge · Rose Gold · Sapphire Crystal', price: 6800, image: '/images/filwd.jpg', category: 'contemporary', rating: 4.8, reviewCount: 94, inStock: true, stockCount: 12 },
  { _id: '3', name: 'Tourbillon Noir', shortDesc: 'Ultra Luxury · Skeletonized · Flying Tourbillon', price: 12500, image: '/images/tourbillon-noir.jpg', category: 'ultra-luxury', rating: 5.0, reviewCount: 43, inStock: true, stockCount: 7 },
];

const categories = [
  { id: 'all', label: 'All Pieces' },
  { id: 'military', label: 'Military Heritage' },
  { id: 'contemporary', label: 'Contemporary' },
  { id: 'ultra-luxury', label: 'Ultra Luxury' },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  useScrollReveal();

  useEffect(() => {
    setLoading(true);
    const cat = active !== 'all' ? `?category=${active}` : '';
    axios.get(`${API}/api/products${cat}`)
      .then(r => setProducts(r.data))
      .catch(() => {
        const filtered = active === 'all' ? fallbackProducts : fallbackProducts.filter(p => p.category === active);
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [active]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-chr-black min-h-screen page-enter">
      {/* Hero */}
      <div className="relative pt-24 pb-16 border-b border-chr-gold/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-chr-gold/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-chr-warm/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-4">The Collection</span>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-chr-cream mb-4">
            Every Piece, <span className="italic text-gold-gradient">Extraordinary</span>
          </h1>
          <p className="font-raleway text-chr-muted text-sm max-w-md mx-auto">
            Handcrafted timepieces built to outlast generations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters + Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`font-raleway text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-sm transition-all duration-300 ${
                  active === cat.id
                    ? 'bg-gold-gradient text-chr-black font-semibold'
                    : 'border border-chr-gold/20 text-chr-muted hover:border-chr-gold/50 hover:text-chr-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-dark px-4 py-2 text-xs rounded-sm bg-chr-dark font-raleway tracking-widest uppercase"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="skeleton rounded-sm h-96" />)}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-playfair text-chr-muted text-2xl mb-2">No timepieces found</div>
            <button onClick={() => setActive('all')} className="btn-outline px-6 py-2.5 text-xs rounded-sm mt-4">Clear Filter</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sorted.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
