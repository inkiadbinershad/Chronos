import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, updateQty, removeFromCart, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', street: '', city: '', country: '', zip: '' });
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [orderNum, setOrderNum] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: form.name, email: form.email, phone: form.phone },
          shippingAddress: { street: form.street, city: form.city, country: form.country, zip: form.zip },
          items: items.map(i => ({ product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.qty })),
          subtotal: total,
          shipping: 0,
          total,
          paymentStatus: 'paid',
          status: 'confirmed',
        })
      });
      const data = await res.json();
      setOrderNum(data.orderNumber || 'CHR-' + Date.now().toString().slice(-6));
      setStep('success');
      clearCart();
    } catch {
      setOrderNum('CHR-' + Date.now().toString().slice(-6));
      setStep('success');
      clearCart();
    }
    setPlacing(false);
  };

  if (step === 'success') return (
    <div className="min-h-screen bg-chr-black flex items-center justify-center pt-20 page-enter">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-full border-2 border-chr-gold/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-chr-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-chr-cream mb-3">Order Confirmed</h1>
        <p className="font-raleway text-chr-muted text-sm mb-2">Your timepiece is being prepared with care.</p>
        <p className="font-raleway text-chr-gold text-sm mb-8 tracking-wider">Order: {orderNum}</p>
        <Link to="/shop" className="btn-gold px-8 py-3.5 text-xs rounded-sm inline-block">Continue Shopping</Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen bg-chr-black flex items-center justify-center pt-20 page-enter">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border border-chr-gold/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-chr-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-chr-cream mb-3">Your Cart is Empty</h2>
        <p className="font-raleway text-chr-muted text-sm mb-8">Discover our extraordinary collection of timepieces.</p>
        <Link to="/shop" className="btn-gold px-8 py-3.5 text-xs rounded-sm inline-block">Explore Collection</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-chr-black min-h-screen pt-24 page-enter">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {step === 'cart' && (
          <>
            <div className="mb-8">
              <span className="font-raleway text-chr-gold text-[10px] tracking-[0.4em] uppercase block mb-2">Your Selection</span>
              <h1 className="font-playfair text-4xl font-bold text-chr-cream">Shopping Cart</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item._id} className="bg-card-gradient border border-chr-gold/10 rounded-sm p-4 flex gap-4 hover:border-chr-gold/20 transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => { e.target.src=`https://placehold.co/100x100/1E0F07/C9A55A?text=CHR`; }}
                      className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-playfair text-chr-cream text-lg font-semibold">{item.name}</h3>
                      <p className="font-playfair text-chr-gold font-bold">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <button onClick={() => removeFromCart(item._id)} className="text-chr-faint hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item._id, item.qty - 1)} className="w-7 h-7 rounded-sm border border-chr-gold/20 text-chr-muted hover:text-chr-gold hover:border-chr-gold/50 transition-all flex items-center justify-center text-sm">−</button>
                        <span className="font-raleway text-chr-cream w-5 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item._id, item.qty + 1)} className="w-7 h-7 rounded-sm border border-chr-gold/20 text-chr-muted hover:text-chr-gold hover:border-chr-gold/50 transition-all flex items-center justify-center text-sm">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-6 h-fit">
                <h3 className="font-playfair text-chr-cream text-xl font-semibold mb-4">Order Summary</h3>
                <div className="gold-sep mb-4" />
                <div className="space-y-3 mb-4 font-raleway text-sm">
                  <div className="flex justify-between">
                    <span className="text-chr-muted">Subtotal</span>
                    <span className="text-chr-cream">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chr-muted">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                </div>
                <div className="gold-sep mb-4" />
                <div className="flex justify-between mb-6">
                  <span className="font-raleway text-chr-cream font-semibold">Total</span>
                  <span className="font-playfair text-gold-gradient text-xl font-bold">${total.toLocaleString()}</span>
                </div>
                <button onClick={() => setStep('checkout')} className="btn-gold w-full py-3.5 text-xs rounded-sm">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'checkout' && (
          <>
            <div className="mb-8">
              <button onClick={() => setStep('cart')} className="flex items-center gap-2 text-chr-muted hover:text-chr-gold transition-colors font-raleway text-xs tracking-wide mb-4">
                ← Back to Cart
              </button>
              <h1 className="font-playfair text-4xl font-bold text-chr-cream">Checkout</h1>
            </div>

            <form onSubmit={handleCheckout}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal */}
                  <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-6">
                    <h3 className="font-playfair text-chr-cream text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[['name','Full Name',true],['email','Email Address',true],['phone','Phone Number',false]].map(([key, label, req]) => (
                        <div key={key} className={key === 'email' ? 'md:col-span-2' : ''}>
                          <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">{label}</label>
                          <input
                            type={key === 'email' ? 'email' : 'text'}
                            required={req}
                            value={form[key]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            className="input-dark w-full px-4 py-2.5 text-sm rounded-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-6">
                    <h3 className="font-playfair text-chr-cream text-lg font-semibold mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[['street','Street Address'],['city','City'],['country','Country'],['zip','ZIP / Postal Code']].map(([key, label]) => (
                        <div key={key} className={key === 'street' ? 'md:col-span-2' : ''}>
                          <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">{label}</label>
                          <input
                            required
                            value={form[key]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            className="input-dark w-full px-4 py-2.5 text-sm rounded-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-6 h-fit">
                  <h3 className="font-playfair text-chr-cream text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {items.map(i => (
                      <div key={i._id} className="flex justify-between font-raleway text-xs">
                        <span className="text-chr-muted">{i.name} ×{i.qty}</span>
                        <span className="text-chr-cream">${(i.price * i.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="gold-sep mb-4" />
                  <div className="flex justify-between mb-6">
                    <span className="font-raleway text-chr-cream">Total</span>
                    <span className="font-playfair text-gold-gradient text-xl font-bold">${total.toLocaleString()}</span>
                  </div>
                  <button type="submit" disabled={placing} className="btn-gold w-full py-3.5 text-xs rounded-sm">
                    {placing ? 'Placing Order...' : 'Place Order'}
                  </button>
                  <p className="font-raleway text-chr-muted text-[10px] text-center mt-3">Free worldwide shipping · Secure checkout</p>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
