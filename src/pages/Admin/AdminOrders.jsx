import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';

const STATUSES = ['Processing', 'Shipped', 'Delivered'];

const statusStyle = (s) => {
  if (s === 'Delivered') return { bg:'rgba(100,200,100,.12)', color:'#7dce7d' };
  if (s === 'Shipped')   return { bg:'rgba(201,169,110,.12)', color:'var(--gold)' };
  return                         { bg:'rgba(232,168,78,.12)',  color:'#e8a84e' };
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const { showToast } = useCart();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);

  const filtered = orders.filter(o => {
    const matchS = o.customer.toLowerCase().includes(search.toLowerCase()) ||
                   o.id.toLowerCase().includes(search.toLowerCase()) ||
                   o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchS && matchStatus;
  });

  const totalRevenue = filtered.reduce((a, b) => a + b.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: .4 }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: '1.8rem' }}>
        <div style={{ fontFamily:'var(--font-title)', fontSize:'1.1rem', letterSpacing:'.22em', color:'var(--gold)', marginBottom:'.3rem' }}>Orders</div>
        <div style={{ fontSize:'.78rem', color:'var(--muted)' }}>{orders.length} orders · ${totalRevenue.toLocaleString()} total value</div>
      </div>

      {/* QUICK STATUS SUMMARY */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'1.8rem' }}>
        {STATUSES.map((s, i) => {
          const count = orders.filter(o => o.status === s).length;
          const ss = statusStyle(s);
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}
              style={{ background:'var(--mahogany)', border:'1px solid var(--border)', padding:'1.1rem 1.3rem' }}
            >
              <div style={{ fontSize:'.6rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'.4rem' }}>{s}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:ss.color, fontWeight:300 }}>{count}</div>
            </motion.div>
          );
        })}
      </div>

      {/* FILTERS */}
      <div style={{ display:'flex', gap:'.8rem', marginBottom:'1.4rem', flexWrap:'wrap', alignItems:'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by ID, customer, product..."
          style={{
            background:'var(--mahogany)', border:'1px solid var(--border)', color:'var(--cream)',
            padding:'.5rem 1rem', fontFamily:'var(--font-body)', fontSize:'.8rem', outline:'none', width:'260px',
          }}
          onFocus={e=>e.target.style.borderColor='var(--gold)'}
          onBlur={e=>e.target.style.borderColor='var(--border)'}
        />
        {['all', ...STATUSES].map(s => (
          <button key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              background: statusFilter===s ? 'rgba(201,169,110,.12)' : 'none',
              border: `1px solid ${statusFilter===s ? 'var(--gold)' : 'var(--border)'}`,
              color: statusFilter===s ? 'var(--gold)' : 'var(--muted)',
              padding:'.42rem .9rem', fontFamily:'var(--font-body)',
              fontSize:'.62rem', letterSpacing:'.14em', textTransform:'capitalize', transition:'all .25s',
            }}
          >{s === 'all' ? 'All' : s}</button>
        ))}
      </div>

      {/* TABLE */}
      <div style={{ background:'var(--mahogany)', border:'1px solid var(--border)', overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {['Order ID','Customer','Product','Date','Amount','Status','Action'].map(h => (
                  <th key={h} style={{
                    textAlign:'left', padding:'.65rem 1rem',
                    fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((o, i) => {
                  const ss = statusStyle(o.status);
                  return (
                    <motion.tr
                      key={o.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ delay: i * .04 }}
                      style={{ borderBottom:'1px solid rgba(201,169,110,.05)', transition:'background .2s', position:'relative' }}
                      onMouseEnter={e=>e.currentTarget.style.background='rgba(201,169,110,.04)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                    >
                      <td style={{ padding:'.75rem 1rem', fontSize:'.75rem', color:'var(--gold)' }}>{o.id}</td>
                      <td style={{ padding:'.75rem 1rem' }}>
                        <div style={{ fontSize:'.78rem', color:'var(--cream)' }}>{o.customer}</div>
                        <div style={{ fontSize:'.68rem', color:'var(--muted)' }}>{o.country}</div>
                      </td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.75rem', color:'var(--muted)' }}>{o.product}</td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.72rem', color:'var(--muted)' }}>{o.date}</td>
                      <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--cream)' }}>${o.amount.toLocaleString()}</td>
                      <td style={{ padding:'.75rem 1rem' }}>
                        <span style={{ padding:'.2rem .55rem', fontSize:'.58rem', letterSpacing:'.12em', textTransform:'uppercase', background:ss.bg, color:ss.color }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding:'.75rem 1rem', position:'relative' }}>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === o.id ? null : o.id)}
                          style={{
                            background:'none', border:'1px solid var(--border)', color:'var(--muted)',
                            padding:'.22rem .7rem', fontSize:'.6rem', letterSpacing:'.12em', transition:'all .25s',
                          }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';}}
                        >
                          Update ▾
                        </button>
                        <AnimatePresence>
                          {openDropdown === o.id && (
                            <motion.div
                              initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                              style={{
                                position:'absolute', top:'100%', right:0,
                                background:'var(--deep)', border:'1px solid var(--border)',
                                zIndex:50, minWidth:'140px',
                              }}
                            >
                              {STATUSES.map(s => (
                                <div
                                  key={s}
                                  onClick={() => {
                                    updateOrderStatus(o.id, s);
                                    setOpenDropdown(null);
                                    showToast(`Order ${o.id} marked as ${s}`);
                                  }}
                                  style={{
                                    padding:'.6rem 1rem', fontSize:'.7rem',
                                    color: o.status === s ? 'var(--gold)' : 'var(--muted)',
                                    background: o.status === s ? 'rgba(201,169,110,.08)' : 'transparent',
                                    cursor:'pointer', transition:'all .2s',
                                    letterSpacing:'.12em',
                                  }}
                                  onMouseEnter={e=>e.currentTarget.style.background='rgba(201,169,110,.06)'}
                                  onMouseLeave={e=>e.currentTarget.style.background= o.status===s?'rgba(201,169,110,.08)':'transparent'}
                                >
                                  {s}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign:'center', padding:'3rem', color:'var(--muted)', fontSize:'.85rem' }}>
                  No orders match your search.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`@media(max-width:900px){div[style*='repeat(3,1fr)'][style*='1rem'][style*='marginBottom: 1.8rem']{grid-template-columns:1fr!important;}}`}</style>
    </motion.div>
  );
}
