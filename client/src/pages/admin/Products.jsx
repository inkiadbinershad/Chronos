import { useState, useEffect } from 'react';
import api from '../../utils/api';

const empty = { name:'', shortDesc:'', description:'', price:'', image:'', category:'military', movement:'', caseMaterial:'', waterResistance:'', diameter:'', strap:'', inStock:true, stockCount:'', featured:false };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/products')
      .then(r => setProducts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (p) => { setEditing(p._id); setForm({ ...p, price: p.price.toString(), stockCount: p.stockCount.toString() }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stockCount: Number(form.stockCount) };
      if (editing) await api.put(`/products/${editing}`, payload);
      else await api.post('/products', payload);
      setModal(false);
      load();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    setDeleting(id);
    try { await api.delete(`/products/${id}`); load(); }
    catch { alert('Delete failed'); }
    setDeleting(null);
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })) });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-chr-cream">Products</h2>
          <p className="font-raleway text-chr-muted text-xs mt-1">{products.length} timepieces in collection</p>
        </div>
        <button onClick={openCreate} className="btn-gold px-5 py-2.5 text-xs rounded-sm">+ Add Product</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="skeleton rounded-sm h-64" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-card-gradient border border-chr-gold/10 rounded-sm p-12 text-center">
          <p className="font-raleway text-chr-muted text-sm mb-4">No products yet.</p>
          <p className="font-raleway text-chr-muted text-xs">Run <code className="text-chr-gold bg-chr-brown/40 px-1 py-0.5 rounded">cd server && npm run seed</code> to seed sample data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-card-gradient border border-chr-gold/10 rounded-sm overflow-hidden hover:border-chr-gold/25 transition-all duration-300 group">
              <div className="relative overflow-hidden" style={{ height: '180px' }}>
                <img
                  src={p.image}
                  alt={p.name}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x300/1E0F07/C9A55A?text=${encodeURIComponent(p.name || 'Watch')}`;
                  }}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chr-black/80 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <span className="font-raleway text-[9px] tracking-[0.2em] uppercase bg-chr-black/70 text-chr-gold border border-chr-gold/20 px-2 py-0.5">{p.category}</span>
                  {p.featured && <span className="font-raleway text-[9px] tracking-[0.2em] uppercase bg-chr-gold/20 text-chr-gold px-2 py-0.5 border border-chr-gold/30">Featured</span>}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-playfair text-chr-cream font-semibold mb-0.5">{p.name}</h3>
                <p className="font-playfair text-chr-gold font-bold mb-3">${p.price.toLocaleString()}</p>
                <div className="flex items-center justify-between">
                  <span className={`font-raleway text-[10px] tracking-wide ${p.inStock ? 'text-green-400' : 'text-red-400'}`}>
                    {p.inStock ? `${p.stockCount} in stock` : 'Out of stock'}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="btn-outline px-3 py-1.5 text-[10px] rounded-sm">Edit</button>
                    <button onClick={() => handleDelete(p._id)} disabled={deleting === p._id} className="font-raleway text-[10px] uppercase tracking-wide text-red-400/70 hover:text-red-400 border border-red-500/20 hover:border-red-500/50 px-3 py-1.5 rounded-sm transition-all duration-300">
                      {deleting === p._id ? '...' : 'Del'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-chr-black/90 backdrop-blur-sm z-50 flex items-start justify-center py-8 px-4 overflow-y-auto">
          <div className="bg-chr-dark border border-chr-gold/20 rounded-sm w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-chr-gold/10">
              <h3 className="font-playfair text-chr-cream text-xl font-semibold">{editing ? 'Edit Product' : 'New Product'}</h3>
              <button onClick={() => setModal(false)} className="text-chr-muted hover:text-chr-gold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Product Name *</label>
                  <input required className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" {...f('name')} />
                </div>
                <div>
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Price (USD) *</label>
                  <input type="number" required min="0" className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" {...f('price')} />
                </div>
                <div>
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Category *</label>
                  <select required className="input-dark w-full px-3 py-2.5 text-sm rounded-sm bg-chr-dark" {...f('category')}>
                    <option value="military">Military Heritage</option>
                    <option value="contemporary">Contemporary</option>
                    <option value="ultra-luxury">Ultra Luxury</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Image Path *</label>
                  <input required placeholder="/images/my-watch.jpg" className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" {...f('image')} />
                  <p className="font-raleway text-chr-muted text-[10px] mt-1">e.g. /images/field-commander.jpg</p>
                </div>
                <div className="col-span-2">
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Short Description</label>
                  <input className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" {...f('shortDesc')} />
                </div>
                <div className="col-span-2">
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Full Description</label>
                  <textarea rows={3} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm resize-none" {...f('description')} />
                </div>
                {[['movement','Movement'],['caseMaterial','Case Material'],['waterResistance','Water Resistance'],['diameter','Diameter'],['strap','Strap']].map(([k, label]) => (
                  <div key={k}>
                    <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">{label}</label>
                    <input className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" {...f(k)} />
                  </div>
                ))}
                <div>
                  <label className="font-raleway text-chr-muted text-[10px] tracking-[0.2em] uppercase block mb-1.5">Stock Count</label>
                  <input type="number" min="0" className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" {...f('stockCount')} />
                </div>
                <div className="col-span-2 flex gap-6">
                  {[['inStock','In Stock'],['featured','Featured']].map(([k, label]) => (
                    <label key={k} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.checked }))} className="w-4 h-4 accent-yellow-600" />
                      <span className="font-raleway text-chr-cream text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gold flex-1 py-3 text-xs rounded-sm">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Product'}
                </button>
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 py-3 text-xs rounded-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
