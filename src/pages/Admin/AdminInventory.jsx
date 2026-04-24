import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const statusStyle = (stock) => {
  if (stock > 15) return { bg:'rgba(100,200,100,.12)', color:'#7dce7d', label:'In Stock' };
  if (stock > 4) return { bg:'rgba(232,168,78,.12)', color:'#e8a84e', label:'Low Stock' };
  return { bg:'rgba(220,80,80,.12)', color:'#e07070', label:'Out of Stock' };
};

export default function AdminInventory() {
  const { products, removeProduct } = useAdmin();
  const { showToast } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = (id, name) => {
    removeProduct(id);
    setConfirmDelete(null);
    showToast(`${name} removed from inventory`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: .4 }}
    >
      {/* HEADER */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.8rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <div style={{ fontFamily:'var(--font-title)', fontSize:'1.1rem', letterSpacing:'.22em', color:'var(--gold)', marginBottom:'.3rem' }}>Inventory</div>
          <div style={{ fontSize:'.78rem', color:'var(--muted)' }}>{products.length} products in catalogue</div>
        </div>
        <button
          onClick={() => navigate('/admin/add')}
          className="btn-primary"
          style={{ fontSize:'.66rem' }}
        >
          ⊕ Add Product
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ display:'flex', gap:'.8rem', marginBottom:'1.5rem', flexWrap:'wrap', alignItems:'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{
            background:'var(--mahogany)', border:'1px solid var(--border)', color:'var(--cream)',
            padding:'.5rem 1rem', fontFamily:'var(--font-body)', fontSize:'.8rem', outline:'none', width:'220px',
            transition:'border-color .3s',
          }}
          onFocus={e=>e.target.style.borderColor='var(--gold)'}
          onBlur={e=>e.target.style.borderColor='var(--border)'}
        />
        {['all','classic','sport','ladies','limited'].map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            style={{
              background: catFilter===c ? 'rgba(201,169,110,.12)' : 'none',
              border: `1px solid ${catFilter===c ? 'var(--gold)' : 'var(--border)'}`,
              color: catFilter===c ? 'var(--gold)' : 'var(--muted)',
              padding:'.42rem .9rem', fontFamily:'var(--font-body)',
              fontSize:'.62rem', letterSpacing:'.18em', textTransform:'capitalize',
              transition:'all .25s',
            }}
          >
            {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div style={{ background:'var(--mahogany)', border:'1px solid var(--border)', overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {['Product','Brand','Category','Price','Stock','Status','Actions'].map(h => (
                  <th key={h} style={{
                    textAlign:'left', padding:'.7rem 1rem',
                    fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((p, i) => {
                  const ss = statusStyle(p.stock);
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: i * .03 }}
                      style={{ borderBottom:'1px solid rgba(201,169,110,.05)', transition:'background .2s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='rgba(201,169,110,.04)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                    >
                      <td style={{ padding:'.75rem 1rem' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'.8rem' }}>
                          <img src={p.img} alt={p.name} style={{ width:'38px', height:'38px', objectFit:'cover', filter:'brightness(.8)' }} />
                          <span style={{ fontSize:'.8rem', color:'var(--cream)' }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.75rem', color:'var(--muted)' }}>{p.brand}</td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.75rem', color:'var(--muted)', textTransform:'capitalize' }}>{p.category}</td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--gold-light)' }}>${p.price.toLocaleString()}</td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--cream)' }}>{p.stock}</td>
                      <td style={{ padding:'.75rem 1rem' }}>
                        <span style={{ padding:'.18rem .55rem', fontSize:'.58rem', letterSpacing:'.12em', textTransform:'uppercase', background:ss.bg, color:ss.color }}>
                          {ss.label}
                        </span>
                      </td>
                      <td style={{ padding:'.75rem 1rem' }}>
                        <div style={{ display:'flex', gap:'.4rem' }}>
                          <button
                            onClick={() => showToast(`Edit for ${p.name} coming soon`)}
                            style={{
                              background:'none', border:'1px solid var(--border)',
                              color:'var(--muted)', padding:'.22rem .6rem',
                              fontSize:'.6rem', letterSpacing:'.1em', transition:'all .25s',
                            }}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';}}
                          >Edit</button>
                          <button
                            onClick={() => setConfirmDelete({ id: p.id, name: p.name })}
                            style={{
                              background:'none', border:'1px solid rgba(220,80,80,.25)',
                              color:'#e07070', padding:'.22rem .6rem',
                              fontSize:'.6rem', letterSpacing:'.1em', transition:'all .25s',
                            }}
                            onMouseEnter={e=>e.currentTarget.style.background='rgba(220,80,80,.1)'}
                            onMouseLeave={e=>e.currentTarget.style.background='none'}
                          >Remove</button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign:'center', padding:'3rem', color:'var(--muted)', fontSize:'.85rem' }}>
                  No products match your search.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:100 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }}
              style={{
                position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                background:'var(--deep)', border:'1px solid var(--border)',
                padding:'2rem', width:'360px', zIndex:101,
              }}
            >
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:'var(--cream)', marginBottom:'.8rem' }}>
                Remove Product?
              </div>
              <p style={{ fontSize:'.82rem', color:'var(--muted)', marginBottom:'1.5rem', lineHeight:1.7 }}>
                This will permanently remove <strong style={{ color:'var(--cream)' }}>{confirmDelete.name}</strong> from the catalogue.
              </p>
              <div style={{ display:'flex', gap:'.8rem' }}>
                <button
                  onClick={() => handleDelete(confirmDelete.id, confirmDelete.name)}
                  style={{
                    flex:1, background:'rgba(220,80,80,.15)', border:'1px solid rgba(220,80,80,.4)',
                    color:'#e07070', padding:'.7rem', fontFamily:'var(--font-body)',
                    fontSize:'.7rem', letterSpacing:'.18em', textTransform:'uppercase',
                  }}
                >Confirm Remove</button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  style={{
                    flex:1, background:'none', border:'1px solid var(--border)',
                    color:'var(--muted)', padding:'.7rem', fontFamily:'var(--font-body)',
                    fontSize:'.7rem', letterSpacing:'.18em', textTransform:'uppercase',
                  }}
                >Cancel</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
