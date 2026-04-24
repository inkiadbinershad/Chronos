import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function AdminCustomers() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then(r => setOrders(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Build unique customers from orders
  const customerMap = {};
  orders.forEach(o => {
    const email = o.customer?.email;
    if (!email) return;
    if (!customerMap[email]) {
      customerMap[email] = { name: o.customer.name, email, orders: 0, spent: 0, last: o.createdAt };
    }
    customerMap[email].orders += 1;
    customerMap[email].spent += o.total || 0;
    if (new Date(o.createdAt) > new Date(customerMap[email].last)) customerMap[email].last = o.createdAt;
  });
  const customers = Object.values(customerMap).sort((a,b) => b.spent - a.spent);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-playfair text-2xl font-bold text-chr-cream">Customers</h2>
        <p className="font-raleway text-chr-muted text-xs mt-0.5">{customers.length} unique buyers</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 rounded-full border-2 border-chr-gold/20 border-t-chr-gold animate-spin" />
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-12 text-center">
          <p className="font-raleway text-chr-muted text-sm">No customer data yet. Orders will populate this view.</p>
        </div>
      ) : (
        <div className="bg-card-gradient border border-chr-gold/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                  <th>Tier</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => {
                  const tier = c.spent >= 10000 ? { label: 'Platinum', cls: 'text-purple-300 bg-purple-900/20 border-purple-500/20' }
                    : c.spent >= 5000 ? { label: 'Gold', cls: 'text-chr-gold bg-chr-gold/10 border-chr-gold/20' }
                    : { label: 'Member', cls: 'text-chr-muted bg-chr-faint/20 border-chr-faint/30' };
                  return (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-chr-warm/30 border border-chr-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="font-playfair text-chr-gold text-xs font-bold">{c.name?.[0]?.toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-raleway text-chr-cream text-sm">{c.name}</p>
                            <p className="font-raleway text-chr-muted text-[10px]">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="font-raleway text-chr-cream">{c.orders}</td>
                      <td className="font-playfair text-chr-gold font-bold">${c.spent.toLocaleString()}</td>
                      <td className="font-raleway text-chr-muted text-xs">{new Date(c.last).toLocaleDateString()}</td>
                      <td><span className={`font-raleway text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded border ${tier.cls}`}>{tier.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
