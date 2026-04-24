import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const USERS_DATA = [
  { name: 'Active Admins', value: 3, color: 'var(--gold)' },
  { name: 'Customers', value: 847, color: '#7dce7d' },
  { name: 'VIP Clients', value: 42, color: '#e8a84e' },
];

const RECENT_USERS = [
  { id: 'USR-001', email: 'james.whitmore@luxury.com', role: 'VIP', orders: 5, joined: 'Nov 2024' },
  { id: 'USR-002', email: 'c.devilliers@paris.fr', role: 'Customer', orders: 3, joined: 'Dec 2024' },
  { id: 'USR-003', email: 'a.petrov@geneva.ch', role: 'VIP', orders: 8, joined: 'Oct 2024' },
];

export default function AdminUsers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1.5rem 0' }}
    >
      <div style={{ marginBottom: '1.8rem' }}>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', letterSpacing: '.22em', color: 'var(--gold)', marginBottom: '.3rem' }}>
          Users
        </div>
        <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>Customer database overview.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.2rem', marginBottom: '2rem' }}>
        {/* RECENT USERS TABLE */}
        <div style={{ background: 'var(--mahogany)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '.62rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Recent Activity
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ID', 'Email', 'Role', 'Orders', 'Joined'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '.7rem 1rem', fontSize: '.58rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_USERS.map((u, i) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(201,169,110,.05)' }}>
                  <td style={{ padding: '.75rem 1rem', color: 'var(--gold)' }}>{u.id}</td>
                  <td style={{ padding: '.75rem 1rem', color: 'var(--cream)' }}>{u.email}</td>
                  <td style={{ padding: '.75rem 1rem', color: u.role === 'VIP' ? '#e8a84e' : 'var(--muted)' }}>{u.role}</td>
                  <td style={{ padding: '.75rem 1rem', color: 'var(--cream)' }}>{u.orders}</td>
                  <td style={{ padding: '.75rem 1rem', color: 'var(--muted)' }}>{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PIE CHART */}
        <div style={{ background: 'var(--mahogany)', border: '1px solid var(--border)', padding: '1.5rem', height: '280px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '.62rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>User Types</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={USERS_DATA.map(d => ({ ...d, fill: d.color }))} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                {USERS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

