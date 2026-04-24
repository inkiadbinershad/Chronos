import { useState, useEffect } from 'react';
import api from '../../utils/api';

function StatCard({ label, value, sub, color = 'gold' }) {
  return (
    <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-5 hover:border-chr-gold/25 transition-all duration-300">
      <p className="font-raleway text-chr-muted text-[10px] tracking-[0.25em] uppercase mb-2">{label}</p>
      <p className={`font-playfair text-3xl font-bold ${color === 'gold' ? 'text-gold-gradient' : color === 'green' ? 'text-green-400' : color === 'blue' ? 'text-blue-400' : 'text-chr-cream'}`}>{value}</p>
      {sub && <p className="font-raleway text-chr-muted text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, delivered: 0, pending: 0, revenue: 0 });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/orders').catch(() => ({ data: [] })),
      api.get('/products').catch(() => ({ data: [] })),
    ]).then(([ordersRes, productsRes]) => {
      const o = ordersRes.data;
      const p = productsRes.data;
      setOrders(o.slice(0, 5));
      setProducts(p);
      setStats({
        totalOrders: o.length,
        delivered: o.filter(x => x.status === 'delivered').length,
        pending: o.filter(x => x.status === 'pending').length,
        revenue: o.reduce((s, x) => s + (x.total || 0), 0),
      });
    }).finally(() => setLoading(false));
  }, []);

  const statusClass = (s) => `badge-${s} text-[10px] px-2 py-0.5 rounded tracking-wide uppercase font-raleway font-medium`;

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 rounded-full border-2 border-chr-gold/20 border-t-chr-gold animate-spin" /></div>;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} color="gold" />
        <StatCard label="Total Orders" value={stats.totalOrders} sub={`${stats.pending} pending`} color="blue" />
        <StatCard label="Delivered" value={stats.delivered} color="green" />
        <StatCard label="Products" value={products.length} sub="in collection" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-card-gradient border border-chr-gold/10 rounded-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-chr-gold/08 flex items-center justify-between">
            <h3 className="font-playfair text-chr-cream text-lg font-semibold">Recent Orders</h3>
          </div>
          {orders.length === 0 ? (
            <div className="p-8 text-center font-raleway text-chr-muted text-sm">No orders yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-dark">
                <thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id}>
                      <td className="font-mono text-chr-gold text-xs">{o.orderNumber}</td>
                      <td>{o.customer?.name}</td>
                      <td>${o.total?.toLocaleString()}</td>
                      <td><span className={statusClass(o.status)}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="bg-card-gradient border border-chr-gold/10 rounded-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-chr-gold/08">
            <h3 className="font-playfair text-chr-cream text-lg font-semibold">Collection</h3>
          </div>
          {products.length === 0 ? (
            <div className="p-8 text-center font-raleway text-chr-muted text-sm">No products. Run the seed script.</div>
          ) : (
            <div className="divide-y divide-chr-gold/06">
              {products.map(p => (
                <div key={p._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/2 transition-colors">
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={e => { e.target.src=`https://placehold.co/40x40/1E0F07/C9A55A?text=C`; }}
                    className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-playfair text-chr-cream text-sm truncate">{p.name}</p>
                    <p className="font-raleway text-chr-muted text-xs">{p.stockCount} in stock</p>
                  </div>
                  <p className="font-playfair text-chr-gold font-bold text-sm">${p.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
