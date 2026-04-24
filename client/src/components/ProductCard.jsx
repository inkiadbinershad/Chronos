import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel = {
    'military': 'Military Heritage',
    'contemporary': 'Contemporary',
    'ultra-luxury': 'Ultra Luxury',
  }[product.category] || product.category;

  return (
    <Link
      to={`/product/${product._id}`}
      className={`product-card rounded-sm block reveal delay-${(index % 4) * 100 + 100}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/500x500/1E0F07/C9A55A?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-chr-black/80 via-transparent to-transparent opacity-60" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="font-raleway text-[9px] tracking-[0.25em] uppercase bg-chr-black/70 text-chr-gold border border-chr-gold/20 px-2 py-1">
            {categoryLabel}
          </span>
        </div>

        {product.stockCount <= 10 && product.stockCount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="font-raleway text-[9px] tracking-[0.2em] uppercase bg-red-900/60 text-red-300 border border-red-500/20 px-2 py-1">
              Only {product.stockCount} left
            </span>
          </div>
        )}

        {/* Quick Add overlay */}
        <div className="card-overlay">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 font-raleway text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
              added
                ? 'bg-green-900/60 text-green-300 border border-green-500/30'
                : 'btn-gold rounded-sm'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'text-chr-gold' : 'text-chr-faint'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="font-raleway text-chr-muted text-[10px] ml-1">({product.reviewCount})</span>
        </div>

        <h3 className="font-playfair text-chr-cream text-lg font-semibold mb-0.5 leading-tight">{product.name}</h3>
        {product.shortDesc && (
          <p className="font-raleway text-chr-muted text-xs mb-3 leading-relaxed">{product.shortDesc}</p>
        )}

        <div className="flex items-center justify-between">
          <p className="font-playfair text-gold-gradient text-xl font-bold">
            ${product.price.toLocaleString()}
          </p>
          <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
      </div>
    </Link>
  );
}
