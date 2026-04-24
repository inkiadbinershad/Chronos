import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { REVENUE_DATA, CATEGORY_DATA } from '../../data';
import { useAdmin } from '../../context/AdminContext';

const CARDS = [
  { label: 'Total Revenue', value: '$284,920', delta: '+18.4%', up: true, icon: '◈' },
  { label: 'Orders This Month', value: '127', delta: '+12.1%', up: true, icon: '◻' },
  { label: 'Products Active', value: null, delta: null, icon: '⊞' },
  { label: 'Avg. Rating', value: '4.9★', delta: '+0.1', up: true, icon: '✦' },
];

function StatCard({ card, count, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, delay }}
      whileHover={{ y: -4, borderColor: 'var(--border-hover)' }}
      style={{
        background: 'var(--mahogany)',
        border: '1px solid var(--border)',
        padding: '1.4rem 1.6rem',
        transition: 'border-color .3s',
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.6rem' }}>
        <div style={{ fontSize:'.62rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)' }}>
          {card.label}
        </div>
        <span style={{ color:'var(--gold)', fontSize:'1rem' }}>{card.icon}</span>
      </div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'2.4rem', fontWeight:300, color:'var(--gold)', lineHeight:1 }}>
        {card.value ?? count}
      </div>
      {card.delta && (
        <div style={{ fontSize:'.68rem', color: card.up ? '#7dce7d' : '#e07070', marginTop:'.5rem' }}>
          {card.up ? '↑' : '↓'} {card.delta} vs last month
        </div>
      )}
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:'var(--deep)', border:'1px solid var(--border)',
      padding:'.7rem 1rem', fontSize:'.75rem',
    }}>
      <div style={{ color:'var(--gold)', marginBottom:'.3rem' }}>{label}</div>
      <div style={{ color:'var(--cream)' }}>${payload[0].value.toLocaleString()}</div>
      <div style={{ color:'var(--muted)' }}>{payload[1]?.value} orders</div>
    </div>
  );
};

export default function AdminOverview() {
  const { products, orders } = useAdmin();
  const recentOrders = orders.slice(0, 6);

  const statusColor = s => s === 'Delivered' ? '#7dce7d' : s === 'Shipped' ? 'var(--gold)' : '#e8a84e';
  const statusBg = s => s === 'Delivered' ? 'rgba(100,200,100,.12)' : s === 'Shipped' ? 'rgba(201,169,110,.12)' : 'rgba(232,168,78,.12)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .4 }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: '1.8rem' }}>
        <div style={{ fontFamily:'var(--font-title)', fontSize:'1.1rem', letterSpacing:'.22em', color:'var(--gold)', marginBottom:'.3rem' }}>
          Overview
        </div>
        <div style={{ fontSize:'.78rem', color:'var(--muted)' }}>Welcome back. Here's what's happening.</div>
      </div>

      {/* STAT CARDS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'2rem' }}>
        {CARDS.map((c, i) => <StatCard key={c.label} card={c} count={products.length} delay={i * .08} />)}
      </div>

      {/* CHARTS ROW */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.2rem', marginBottom:'2rem' }}>
        {/* REVENUE CHART */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
          style={{ background:'var(--mahogany)', border:'1px solid var(--border)', padding:'1.5rem' }}
        >
          <div style={{ marginBottom:'1.2rem' }}>
            <div style={{ fontSize:'.62rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)' }}>Revenue</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--cream)', marginTop:'.2rem' }}>
              6-Month Performance
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a96e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#c9a96e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,110,0.08)" />
              <XAxis dataKey="month" tick={{ fill:'#a08060', fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#a08060', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#c9a96e" strokeWidth={2} fill="url(#goldGrad)" />
              <Area type="monotone" dataKey="orders" stroke="#5c3d2e" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* PIE CHART */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }}
          style={{ background:'var(--mahogany)', border:'1px solid var(--border)', padding:'1.5rem' }}
        >
          <div style={{ marginBottom:'1rem' }}>
            <div style={{ fontSize:'.62rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)' }}>Sales Mix</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--cream)', marginTop:'.2rem' }}>
              By Category
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend
                iconType="square"
                formatter={(v) => <span style={{ color:'var(--muted)', fontSize:'.7rem' }}>{v}</span>}
              />
              <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background:'var(--deep)', border:'1px solid var(--border)', color:'var(--cream)' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}
        style={{ background:'var(--mahogany)', border:'1px solid var(--border)', overflow:'hidden' }}
      >
        <div style={{ padding:'1.2rem 1.5rem', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:'.62rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--gold)' }}>Recent Orders</div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                {['Order ID','Customer','Product','Amount','Status'].map(h => (
                  <th key={h} style={{
                    textAlign:'left', padding:'.65rem 1rem',
                    fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase',
                    color:'var(--gold)', borderBottom:'1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 + i * .05 }}
                  style={{ borderBottom:'1px solid rgba(201,169,110,.05)', transition:'background .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(201,169,110,.04)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--gold)' }}>{o.id}</td>
                  <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--cream)' }}>{o.customer}</td>
                  <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--muted)' }}>{o.product}</td>
                  <td style={{ padding:'.75rem 1rem', fontSize:'.78rem', color:'var(--cream)' }}>${o.amount.toLocaleString()}</td>
                  <td style={{ padding:'.75rem 1rem' }}>
                    <span style={{
                      padding:'.2rem .6rem', fontSize:'.58rem',
                      letterSpacing:'.15em', textTransform:'uppercase',
                      background: statusBg(o.status), color: statusColor(o.status),
                    }}>{o.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <style>{`
        @media(max-width:1100px){
          div[style*='repeat(4,1fr)'][style*='1rem'][style*='marginBottom']{grid-template-columns:repeat(2,1fr)!important;}
          div[style*='2fr 1fr']{grid-template-columns:1fr!important;}
        }
      `}</style>
    </motion.div>
  );
}
