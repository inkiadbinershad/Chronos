import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const INIT = { name:'', brand:'', price:'', oldPrice:'', category:'classic', badge:'', stock:'', img:'', desc:'', movement:'', caseDiameter:'', waterResistance:'' };

export default function AdminAddProduct() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const { addProduct } = useAdmin();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const set = (key, val) => { setForm(f => ({...f, [key]: val})); setErrors(e => ({...e, [key]: null})); };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Required';
    if (!form.brand) e.brand = 'Required';
    if (!form.price || isNaN(form.price)) e.price = 'Valid price required';
    if (!form.stock || isNaN(form.stock)) e.stock = 'Valid stock required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    addProduct({
      name: form.name,
      brand: form.brand,
      price: parseInt(form.price),
      oldPrice: form.oldPrice ? parseInt(form.oldPrice) : null,
      category: form.category,
      badge: form.badge || null,
      stock: parseInt(form.stock),
      img: form.img || 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=85&auto=format&fit=crop',
      desc: form.desc,
      movement: form.movement,
      caseDiameter: form.caseDiameter,
      waterResistance: form.waterResistance,
    });
    showToast(`${form.name} added to catalogue`);
    setForm(INIT);
    setTimeout(() => navigate('/admin/inventory'), 1200);
  };

  const inputStyle = (key) => ({
    background: 'var(--mahogany)',
    border: `1px solid ${errors[key] ? 'rgba(220,80,80,.6)' : 'var(--border)'}`,
    color: 'var(--cream)', padding: '.65rem .9rem',
    fontFamily: 'var(--font-body)', fontSize: '.85rem',
    outline: 'none', width: '100%', transition: 'border-color .3s',
  });

  const labelStyle = { fontSize:'.6rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.35rem', display:'block' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: .4 }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily:'var(--font-title)', fontSize:'1.1rem', letterSpacing:'.22em', color:'var(--gold)', marginBottom:'.3rem' }}>Add Product</div>
        <div style={{ fontSize:'.78rem', color:'var(--muted)' }}>Add a new timepiece to the catalogue</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'2rem', alignItems:'start' }}>
        {/* FORM */}
        <div style={{ background:'var(--mahogany)', border:'1px solid var(--border)', padding:'2rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.2rem' }}>

            {/* NAME */}
            <div>
              <label style={labelStyle}>Watch Name *</label>
              <input value={form.name} onChange={e=>set('name',e.target.value)}
                placeholder="e.g. Royal Perpetual II" style={inputStyle('name')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor=errors.name?'rgba(220,80,80,.6)':'var(--border)'}
              />
              {errors.name && <span style={{fontSize:'.65rem',color:'#e07070'}}>{errors.name}</span>}
            </div>

            {/* BRAND */}
            <div>
              <label style={labelStyle}>Brand / Line *</label>
              <input value={form.brand} onChange={e=>set('brand',e.target.value)}
                placeholder="e.g. Chronos Classic" style={inputStyle('brand')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor=errors.brand?'rgba(220,80,80,.6)':'var(--border)'}
              />
              {errors.brand && <span style={{fontSize:'.65rem',color:'#e07070'}}>{errors.brand}</span>}
            </div>

            {/* PRICE */}
            <div>
              <label style={labelStyle}>Price (USD) *</label>
              <input value={form.price} onChange={e=>set('price',e.target.value)}
                type="number" placeholder="e.g. 12500" style={inputStyle('price')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor=errors.price?'rgba(220,80,80,.6)':'var(--border)'}
              />
              {errors.price && <span style={{fontSize:'.65rem',color:'#e07070'}}>{errors.price}</span>}
            </div>

            {/* OLD PRICE */}
            <div>
              <label style={labelStyle}>Original Price (if on sale)</label>
              <input value={form.oldPrice} onChange={e=>set('oldPrice',e.target.value)}
                type="number" placeholder="Leave empty if no sale" style={inputStyle('oldPrice')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={e=>set('category',e.target.value)}
                style={{ ...inputStyle('category'), cursor:'pointer' }}>
                {['classic','sport','ladies','limited'].map(c => (
                  <option key={c} value={c} style={{background:'var(--deep)'}}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* STOCK */}
            <div>
              <label style={labelStyle}>Stock Quantity *</label>
              <input value={form.stock} onChange={e=>set('stock',e.target.value)}
                type="number" placeholder="e.g. 24" style={inputStyle('stock')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor=errors.stock?'rgba(220,80,80,.6)':'var(--border)'}
              />
              {errors.stock && <span style={{fontSize:'.65rem',color:'#e07070'}}>{errors.stock}</span>}
            </div>

            {/* BADGE */}
            <div>
              <label style={labelStyle}>Badge (optional)</label>
              <input value={form.badge} onChange={e=>set('badge',e.target.value)}
                placeholder="e.g. New Arrival, Ltd. 50 pcs" style={inputStyle('badge')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* IMAGE URL */}
            <div>
              <label style={labelStyle}>Image URL</label>
              <input value={form.img} onChange={e=>set('img',e.target.value)}
                placeholder="https://images.unsplash.com/..." style={inputStyle('img')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* SPECS ROW */}
            <div>
              <label style={labelStyle}>Movement</label>
              <input value={form.movement} onChange={e=>set('movement',e.target.value)}
                placeholder="e.g. Swiss Automatic" style={inputStyle('movement')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>
            <div>
              <label style={labelStyle}>Case Diameter</label>
              <input value={form.caseDiameter} onChange={e=>set('caseDiameter',e.target.value)}
                placeholder="e.g. 41mm" style={inputStyle('caseDiameter')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>
            <div>
              <label style={labelStyle}>Water Resistance</label>
              <input value={form.waterResistance} onChange={e=>set('waterResistance',e.target.value)}
                placeholder="e.g. 100m" style={inputStyle('waterResistance')}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* DESCRIPTION FULL WIDTH */}
            <div style={{ gridColumn:'1/-1' }}>
              <label style={labelStyle}>Description</label>
              <textarea value={form.desc} onChange={e=>set('desc',e.target.value)}
                placeholder="Brief description of the timepiece..."
                rows={3}
                style={{ ...inputStyle('desc'), resize:'vertical' }}
                onFocus={e=>e.target.style.borderColor='var(--gold)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* SUBMIT */}
            <div style={{ gridColumn:'1/-1', display:'flex', gap:'1rem' }}>
              <motion.button
                whileHover={{ background:'var(--gold-light)' }}
                whileTap={{ scale:.97 }}
                onClick={submit}
                style={{
                  flex:1, background:'var(--gold)', border:'none', color:'var(--espresso)',
                  padding:'.85rem', fontFamily:'var(--font-body)', fontSize:'.72rem',
                  letterSpacing:'.22em', textTransform:'uppercase', fontWeight:500,
                }}
              >
                ✦ Add to Catalogue
              </motion.button>
              <button
                onClick={() => setForm(INIT)}
                style={{
                  background:'none', border:'1px solid var(--border)', color:'var(--muted)',
                  padding:'.85rem 1.4rem', fontFamily:'var(--font-body)', fontSize:'.7rem',
                  letterSpacing:'.18em', textTransform:'uppercase', transition:'all .3s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';}}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div style={{ position:'sticky', top:'1rem' }}>
          <div style={{ fontSize:'.6rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.8rem' }}>
            Live Preview
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            style={{ background:'var(--mahogany)', border:'1px solid var(--border)', overflow:'hidden' }}
          >
            <div style={{ aspectRatio:'1', background:'var(--deep)', overflow:'hidden', position:'relative' }}>
              {form.img ? (
                <img src={form.img} alt="preview"
                  style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.85)' }}
                  onError={e=>e.target.style.display='none'}
                />
              ) : (
                <div style={{
                  width:'100%', height:'100%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'var(--muted)', fontSize:'.8rem', letterSpacing:'.12em',
                }}>No image URL</div>
              )}
              {form.badge && (
                <div style={{
                  position:'absolute', top:'.9rem', left:'.9rem',
                  background:'var(--gold)', color:'var(--espresso)',
                  padding:'.18rem .55rem', fontSize:'.56rem',
                  letterSpacing:'.18em', textTransform:'uppercase', fontWeight:700,
                }}>{form.badge}</div>
              )}
            </div>
            <div style={{ padding:'1.1rem' }}>
              <div style={{ fontSize:'.58rem', letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.3rem' }}>
                {form.brand || 'Brand'}
              </div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--cream)', marginBottom:'.4rem' }}>
                {form.name || 'Watch Name'}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'.8rem' }}>
                <span style={{ fontSize:'.88rem', color:'var(--gold-light)' }}>
                  {form.price ? `$${parseInt(form.price).toLocaleString()}` : '$0'}
                </span>
                {form.oldPrice && (
                  <span style={{ fontSize:'.75rem', color:'var(--muted)', textDecoration:'line-through' }}>
                    ${parseInt(form.oldPrice).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:1100px){
          div[style*='1fr 340px']{grid-template-columns:1fr!important;}
          div[style*="position:'sticky'"]{position:relative!important;}
        }
        @media(max-width:700px){
          div[style*='1fr 1fr'][style*='gap: 1.2rem']{grid-template-columns:1fr!important;}
        }
      `}</style>
    </motion.div>
  );
}
