import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fallback = {
  '1': { _id:'1', name:'Field Commander', shortDesc:'Military Heritage · Steel Case · Brown Leather', description:'The Field Commander embodies military heritage reborn in a modern masterpiece. Forged from Grade 5 titanium and finished with a matte-brushed bezel, it carries the soul of wartime precision into a world that demands style.', price:4200, image:'/images/field-commander.jpg', category:'military', movement:'Automatic, Swiss ETA 2824-2', caseMaterial:'Grade 5 Titanium', waterResistance:'200m / 660ft', diameter:'42mm', strap:'Italian Brown Leather, 20mm', inStock:true, stockCount:24, rating:4.9, reviewCount:186 },
  '2': { _id:'2', name:'Filwd Chronograph', shortDesc:'Contemporary Edge · Rose Gold · Sapphire Crystal', description:'The Filwd Chronograph defines contemporary luxury with razor-sharp lines and a chronograph movement that is as precise as it is beautiful.', price:6800, image:'/images/filwd.jpg', category:'contemporary', movement:'Swiss Valjoux 7750 Chronograph', caseMaterial:'316L Stainless Steel, Rose Gold PVD', waterResistance:'100m / 330ft', diameter:'44mm', strap:'Alligator-embossed Black Rubber, 22mm', inStock:true, stockCount:12, rating:4.8, reviewCount:94 },
  '3': { _id:'3', name:'Tourbillon Noir', shortDesc:'Ultra Luxury · Skeletonized · Flying Tourbillon', description:'The Tourbillon Noir is CHRONOS at its absolute apex. A flying tourbillon complication — rotating once per minute — sits at 6 o\'clock, defying gravity and conventional watchmaking.', price:12500, image:'/images/tourbillon-noir.jpg', category:'ultra-luxury', movement:'In-house CHRON-01 Flying Tourbillon, Hand-wound', caseMaterial:'Black PVD Steel, Sapphire Exhibition Caseback', waterResistance:'50m / 165ft', diameter:'41mm', strap:'Hornback Crocodile, 19mm, Black with Gold Stitching', inStock:true, stockCount:7, rating:5.0, reviewCount:43 },
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState('specs');
  const { addToCart } = useCart();
  useScrollReveal();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(() => setProduct(fallback[id] || null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) return (
    <div className="min-h-screen bg-chr-black flex items-center justify-center pt-16">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-chr-gold/20 border-t-chr-gold animate-spin" />
        <span className="font-raleway text-chr-muted text-xs tracking-widest uppercase">Loading</span>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-chr-black flex items-center justify-center pt-16">
      <div className="text-center">
        <p className="font-playfair text-chr-muted text-2xl mb-4">Timepiece not found</p>
        <Link to="/shop" className="btn-gold px-6 py-3 text-xs rounded-sm inline-block">Back to Collection</Link>
      </div>
    </div>
  );

  const specs = [
    ['Movement', product.movement],
    ['Case Material', product.caseMaterial],
    ['Water Resistance', product.waterResistance],
    ['Case Diameter', product.diameter],
    ['Strap', product.strap],
  ].filter(([_, v]) => v);

  return (
    <div className="bg-chr-black min-h-screen pt-20 page-enter">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 font-raleway text-xs text-chr-muted">
          <Link to="/" className="hover:text-chr-gold transition-colors">Home</Link>
          <span className="text-chr-faint">›</span>
          <Link to="/shop" className="hover:text-chr-gold transition-colors">Collection</Link>
          <span className="text-chr-faint">›</span>
          <span className="text-chr-cream">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="reveal-left">
            <div className="relative overflow-hidden rounded-sm bg-card-gradient border border-chr-gold/10">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => { e.target.src=`https://placehold.co/600x600/1E0F07/C9A55A?text=${encodeURIComponent(product.name)}`; }}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chr-black/30 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Info */}
          <div className="reveal-right">
            <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-4">
              {product.category === 'military' ? 'Military Heritage' : product.category === 'ultra-luxury' ? 'Ultra Luxury' : 'Contemporary'}
            </span>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-chr-cream mb-2">{product.name}</h1>
            {product.shortDesc && (
              <p className="font-raleway text-chr-muted text-sm mb-4">{product.shortDesc}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-chr-gold' : 'text-chr-faint'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-raleway text-chr-muted text-sm">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="gold-sep mb-6" />

            <div className="font-playfair text-4xl font-bold text-gold-gradient mb-6">
              ${product.price.toLocaleString()}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-8">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="font-raleway text-xs text-chr-muted">
                {product.inStock ? `In Stock — ${product.stockCount} remaining` : 'Out of Stock'}
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 py-4 text-xs rounded-sm font-raleway font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
                  added ? 'bg-green-900/40 text-green-300 border border-green-500/30' :
                  product.inStock ? 'btn-gold' : 'bg-chr-faint text-chr-muted cursor-not-allowed'
                }`}
              >
                {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Sold Out'}
              </button>
              <Link
                to="/cart"
                className="btn-outline px-6 py-4 text-xs rounded-sm whitespace-nowrap"
              >
                View Cart
              </Link>
            </div>

            {/* Tabs */}
            <div className="border border-chr-gold/10 rounded-sm overflow-hidden">
              <div className="flex border-b border-chr-gold/10">
                {[['specs', 'Specifications'], ['description', 'Description'], ['delivery', 'Delivery']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`flex-1 py-3 font-raleway text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                      tab === key ? 'bg-chr-gold/10 text-chr-gold border-b-2 border-chr-gold' : 'text-chr-muted hover:text-chr-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {tab === 'specs' && (
                  <div className="space-y-3">
                    {specs.map(([key, val]) => (
                      <div key={key} className="flex items-start justify-between gap-4 py-2 border-b border-chr-gold/06">
                        <span className="font-raleway text-chr-muted text-xs tracking-wide">{key}</span>
                        <span className="font-raleway text-chr-cream text-xs text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'description' && (
                  <p className="font-raleway text-chr-muted text-sm leading-relaxed">{product.description}</p>
                )}
                {tab === 'delivery' && (
                  <div className="space-y-3 font-raleway text-sm text-chr-muted">
                    <p>• Complimentary worldwide shipping on all orders</p>
                    <p>• Arrives in a handcrafted mahogany presentation box</p>
                    <p>• 30-day return policy, no questions asked</p>
                    <p>• Lifetime service warranty included</p>
                    <p>• Certificate of Authenticity with every timepiece</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
