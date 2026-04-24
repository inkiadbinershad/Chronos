import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fallback products for when API is unavailable
const fallbackProducts = [
  { _id: '1', name: 'Field Commander', shortDesc: 'Military Heritage · Steel Case · Brown Leather', price: 4200, image: '/images/field-commander.jpg', category: 'military', rating: 4.9, reviewCount: 186, inStock: true, stockCount: 24 },
  { _id: '2', name: 'Filwd Chronograph', shortDesc: 'Contemporary Edge · Rose Gold · Sapphire Crystal', price: 6800, image: '/images/filwd.jpg', category: 'contemporary', rating: 4.8, reviewCount: 94, inStock: true, stockCount: 12 },
  { _id: '3', name: 'Tourbillon Noir', shortDesc: 'Ultra Luxury · Skeletonized · Flying Tourbillon', price: 12500, image: '/images/tourbillon-noir.jpg', category: 'ultra-luxury', rating: 5.0, reviewCount: 43, inStock: true, stockCount: 7 },
];

function StatCounter({ value, label, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center reveal">
      <div className="font-playfair text-4xl md:text-5xl font-bold text-gold-gradient mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-raleway text-chr-muted text-xs tracking-[0.2em] uppercase">{label}</div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [heroWatch, setHeroWatch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    axios.get(`${API}/api/products?featured=true`)
      .then(r => setProducts(r.data))
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  // Hero image rotation
  useEffect(() => {
    const timer = setInterval(() => setHeroWatch(p => (p + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  const heroImages = [
    '/images/tourbillon-noir.jpg',
    '/images/field-commander.jpg',
    '/images/filwd.jpg',
  ];

  const heroData = [
    { title: 'The Art of', highlight: 'Eternity', sub: 'Tourbillon Noir' },
    { title: 'Born From', highlight: 'Battle', sub: 'Field Commander' },
    { title: 'Edge of', highlight: 'Time', sub: 'Filwd Chronograph' },
  ];

  return (
    <div className="bg-chr-black min-h-screen page-enter">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 scale-110 transition-none"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.3}px)` }}
        >
          {heroImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onError={(e) => { e.target.style.display = 'none'; }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroWatch === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-chr-black via-chr-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-chr-black/80 via-transparent to-transparent" />
        </div>

        {/* Decorative circle */}
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full border border-chr-gold/15 hidden md:block" style={{ transform: `translate(0, calc(-50% + ${scrollY * 0.1}px)) rotate(${scrollY * 0.05}deg)` }} />
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 w-52 h-52 md:w-80 md:h-80 rounded-full border border-chr-gold/08 hidden md:block" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-chr-gold/60" />
              <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase animate-fade-in">
                {heroData[heroWatch].sub}
              </span>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
              <span className="text-chr-cream block animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {heroData[heroWatch].title}
              </span>
              <span className="text-gold-gradient block animate-fade-up" style={{ animationDelay: '0.2s' }}>
                {heroData[heroWatch].highlight}
              </span>
            </h1>

            <p className="font-raleway text-chr-muted text-sm md:text-base leading-relaxed mb-8 max-w-md animate-fade-up" style={{ animationDelay: '0.3s' }}>
              Each CHRONOS timepiece is assembled by a single master watchmaker,<br className="hidden md:block" />
              taking up to 200 hours to bring to life.
            </p>

            <div className="flex gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/shop" className="btn-gold px-8 py-3.5 text-xs rounded-sm inline-block">
                Explore Collection
              </Link>
              <button className="btn-outline px-8 py-3.5 text-xs rounded-sm">
                Our Heritage
              </button>
            </div>
          </div>
        </div>

        {/* Hero dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => setHeroWatch(i)}
              className={`rounded-full transition-all duration-400 ${heroWatch === i ? 'w-6 h-1.5 bg-chr-gold' : 'w-1.5 h-1.5 bg-chr-faint'}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 flex flex-col items-center gap-2 z-10">
          <div className="h-12 w-px bg-gradient-to-b from-chr-gold/60 to-transparent animate-pulse" />
          <span className="font-raleway text-chr-muted text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mt-2">Scroll</span>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-chr-brown/30 border-y border-chr-gold/10 py-3 overflow-hidden">
        <div className="marquee-inner flex gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {['Swiss Precision', '·', 'Hand Assembled', '·', 'Lifetime Warranty', '·', 'Est. 1924', '·', 'Limited Editions', '·', '60+ Countries', '·', 'Master Craftsmen', '·'].map((t, j) => (
                <span key={j} className={`font-raleway text-[10px] tracking-[0.3em] uppercase ${t === '·' ? 'text-chr-gold' : 'text-chr-muted'}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-4 reveal">The Collection</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-chr-cream reveal delay-200">
            Masterpieces of <span className="italic text-gold-gradient">Time</span>
          </h2>
          <div className="w-16 h-px bg-chr-gold/40 mx-auto mt-6 reveal delay-300" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="skeleton rounded-sm h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}

        <div className="text-center mt-12 reveal">
          <Link to="/shop" className="btn-outline px-10 py-3.5 text-xs rounded-sm inline-block">
            View Full Collection
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-chr-dark/60 to-chr-black" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative reveal-left">
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src="/images/tourbillon-noir.jpg"
                  alt="Craftsmanship"
                  onError={(e) => { e.target.src='https://placehold.co/600x700/1E0F07/C9A55A?text=CHRONOS'; }}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-chr-black/30" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-chr-brown border border-chr-gold/20 p-5 reveal-scale delay-300">
                <div className="font-playfair text-3xl font-bold text-gold-gradient">100</div>
                <div className="font-raleway text-chr-muted text-[9px] tracking-[0.2em] uppercase mt-1">Years of<br/>Heritage</div>
              </div>
            </div>

            {/* Text */}
            <div className="reveal-right">
              <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-4">Our Story</span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-chr-cream leading-tight mb-6">
                A Century of<br />
                <span className="italic text-gold-gradient">Timeless Craft</span>
              </h2>
              <p className="font-raleway text-chr-muted text-sm leading-relaxed mb-4">
                Founded in 1924 by master watchmaker Heinrich Müller in Geneva, CHRONOS was born from the belief that a watch should be more than an instrument — it should be a legacy.
              </p>
              <p className="font-raleway text-chr-muted text-sm leading-relaxed mb-8">
                Every movement we produce begins as raw metal and ends as a precision instrument, assembled entirely by human hands — no automated lines, no shortcuts. Just the patient artistry of our master craftsmen, each trained for over a decade before touching a CHRONOS movement.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {['Each watch assembled by a single master craftsman', 'In-house movement development since 1951', 'Only 500 pieces crafted annually'].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 reveal delay-${i * 100 + 200}`}>
                    <div className="w-1 h-1 rounded-full bg-chr-gold flex-shrink-0" />
                    <span className="font-raleway text-chr-cream text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/shop" className="btn-gold px-8 py-3.5 text-xs rounded-sm inline-block">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-y border-chr-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={15000} label="Watches Sold" suffix="+" />
            <StatCounter value={60} label="Countries" suffix="+" />
            <StatCounter value={100} label="Years Heritage" />
            <StatCounter value={4.9} label="Average Rating" suffix="★" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-4 reveal">Testimonials</span>
            <h2 className="font-playfair text-4xl font-bold text-chr-cream reveal delay-200">
              Voices of <span className="italic text-gold-gradient">Owners</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'James H.', loc: 'London, UK', text: 'The Tourbillon Noir is otherworldly. The skeletonized dial reveals a mechanical ballet that I find myself watching more than the time itself.' },
              { name: 'Amir K.', loc: 'Dubai, UAE', text: 'My Field Commander has survived three expeditions and still runs flawlessly. It\'s not a watch — it\'s a companion for life.' },
              { name: 'Sofia M.', loc: 'New York, US', text: 'Gifted a Filwd Chronograph to my husband. He hasn\'t taken it off in eight months. The craftsmanship is simply on another level.' },
            ].map((t, i) => (
              <div key={i} className={`bg-card-gradient border border-chr-gold/10 p-6 rounded-sm reveal delay-${i * 100 + 100} hover:border-chr-gold/25 transition-all duration-400`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3 h-3 text-chr-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-raleway text-chr-muted text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-playfair text-chr-cream text-sm font-semibold">{t.name}</div>
                  <div className="font-raleway text-chr-muted text-[10px] tracking-widest uppercase">{t.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/field-commander.jpg" alt="" onError={(e) => { e.target.style.display='none'; }} className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-chr-dark/90" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-4 reveal">Private Access</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-chr-cream mb-4 reveal delay-200">
            Join the <span className="italic text-gold-gradient">Inner Circle</span>
          </h2>
          <p className="font-raleway text-chr-muted text-sm leading-relaxed mb-8 reveal delay-300">
            Receive exclusive access to limited editions, private events, and the stories behind each timepiece — before the world knows.
          </p>
          <div className="flex gap-2 max-w-md mx-auto reveal delay-400">
            <input
              type="email"
              placeholder="Your email address"
              className="input-dark flex-1 px-4 py-3 text-sm rounded-sm"
            />
            <button className="btn-gold px-6 py-3 text-xs rounded-sm whitespace-nowrap">
              Join Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
