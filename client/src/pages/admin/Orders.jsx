import { useState, useEffect } from 'react';
import api from '../../utils/api';
const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/orders')
      .then(r => setOrders(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const updated = await api.put(`/orders/${id}`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch {}
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const badge = (s) => (
    <span className={`badge-${s} text-[9px] px-2 py-0.5 rounded tracking-[0.1em] uppercase font-raleway font-semibold`}>{s}</span>
  );

  return (
    <div className="flex gap-6 h-full">
      {/* List */}
      <div className={`flex flex-col ${selected ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-chr-cream">Orders</h2>
            <p className="font-raleway text-chr-muted text-xs mt-0.5">{orders.length} total orders</p>
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="input-dark px-3 py-2 text-xs rounded-sm bg-chr-dark font-raleway tracking-wide uppercase"
          >
            <option value="all">All Status</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 rounded-full border-2 border-chr-gold/20 border-t-chr-gold animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-12 text-center">
            <p className="font-raleway text-chr-muted text-sm">No orders found.</p>
          </div>
        ) : (
          <div className="bg-card-gradient border border-chr-gold/10 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-dark">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    {!selected && <th>Items</th>}
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(o => (
                    <tr
                      key={o._id}
                      className={`cursor-pointer ${selected?._id === o._id ? 'bg-chr-gold/5' : ''}`}
                      onClick={() => setSelected(s => s?._id === o._id ? null : o)}
                    >
                      <td className="font-mono text-chr-gold text-xs">{o.orderNumber}</td>
                      <td>
                        <div className="font-raleway text-chr-cream text-xs">{o.customer?.name}</div>
                        <div className="font-raleway text-chr-muted text-[10px]">{o.customer?.email}</div>
                      </td>
                      {!selected && <td className="text-chr-muted text-xs">{o.items?.length || 0} piece{o.items?.length !== 1 ? 's' : ''}</td>}
                      <td className="font-playfair text-chr-gold font-bold">${o.total?.toLocaleString()}</td>
                      <td>{badge(o.status)}</td>
                      <td>
                        <svg className={`w-4 h-4 text-chr-muted transition-transform ${selected?._id === o._id ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-1/2 bg-card-gradient border border-chr-gold/10 rounded-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-chr-gold/08">
            <div>
              <p className="font-mono text-chr-gold text-sm font-bold">{selected.orderNumber}</p>
              <p className="font-raleway text-chr-muted text-[10px] mt-0.5">{new Date(selected.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-chr-muted hover:text-chr-gold transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Customer */}
            <div>
              <p className="font-raleway text-[10px] tracking-[0.25em] uppercase text-chr-gold mb-2">Customer</p>
              <p className="font-raleway text-chr-cream text-sm">{selected.customer?.name}</p>
              <p className="font-raleway text-chr-muted text-xs">{selected.customer?.email}</p>
              {selected.customer?.phone && <p className="font-raleway text-chr-muted text-xs">{selected.customer.phone}</p>}
            </div>

            {/* Shipping */}
            {selected.shippingAddress?.street && (
              <div>
                <p className="font-raleway text-[10px] tracking-[0.25em] uppercase text-chr-gold mb-2">Shipping Address</p>
                <p className="font-raleway text-chr-muted text-xs leading-relaxed">
                  {selected.shippingAddress.street}<br />
                  {selected.shippingAddress.city}, {selected.shippingAddress.country} {selected.shippingAddress.zip}
                </p>
              </div>
            )}

            {/* Items */}
            <div>
              <p className="font-raleway text-[10px] tracking-[0.25em] uppercase text-chr-gold mb-2">Items</p>
              <div className="space-y-2">
                {selected.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-chr-brown/20 rounded-sm p-2">
                    <img
                      src={item.image || '/images/field-commander.jpg'}
                      onError={e => { e.target.src='https://placehold.co/36x36/1E0F07/C9A55A?text=C'; }}
                      className="w-9 h-9 object-cover rounded-sm flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-raleway text-chr-cream text-xs">{item.name}</p>
                      <p className="font-raleway text-chr-muted text-[10px]">×{item.quantity} @ ${item.price?.toLocaleString()}</p>
                    </div>
                    <p className="font-playfair text-chr-gold text-sm font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-chr-gold/10 pt-3">
              <div className="flex justify-between">
                <span className="font-raleway text-chr-muted text-sm">Total</span>
                <span className="font-playfair text-gold-gradient text-lg font-bold">${selected.total?.toLocaleString()}</span>
              </div>
            </div>

            {/* Status update */}
            <div>
              <p className="font-raleway text-[10px] tracking-[0.25em] uppercase text-chr-gold mb-2">Update Status</p>
              <div className="grid grid-cols-3 gap-1.5">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`font-raleway text-[9px] tracking-[0.1em] uppercase py-2 rounded-sm transition-all duration-200 ${
                      selected.status === s
                        ? 'bg-chr-gold/15 text-chr-gold border border-chr-gold/30'
                        : 'border border-chr-faint text-chr-muted hover:border-chr-gold/30 hover:text-chr-cream'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
