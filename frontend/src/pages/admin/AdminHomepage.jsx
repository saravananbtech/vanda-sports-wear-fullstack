import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function AdminHomepage() {
  const { offers, setOffers, showToast } = useApp();
  const [form, setForm] = useState({ code: '', desc: '' });

  const addOffer = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    setOffers((prev) => [...prev, { id: prev.length + 1, ...form, active: true }]);
    setForm({ code: '', desc: '' });
    showToast('Offer added');
  };

  const toggleOffer = (id) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  };

  return (
    <div>
      <h1 className="admin-title">Homepage &amp; Offers</h1>
      <p className="admin-note">Manage promo codes shown on the storefront. Hero banner &amp; image management connect to the media API in the full build.</p>

      <form className="admin-inline-form" onSubmit={addOffer}>
        <input type="text" placeholder="Offer code (e.g. TEAM40)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
        <input type="text" placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        <button type="submit" className="small-btn primary">+ Add Offer</button>
      </form>

      <table className="admin-table">
        <thead><tr><th>Code</th><th>Description</th><th>Status</th><th style={{ width: 100 }}>Actions</th></tr></thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id}>
              <td>{o.code}</td>
              <td className="muted">{o.desc}</td>
              <td><span className={`status-pill ${o.active ? 'delivered' : 'processing'}`}>{o.active ? 'Active' : 'Inactive'}</span></td>
              <td><button className="small-btn" onClick={() => toggleOffer(o.id)}>{o.active ? 'Disable' : 'Enable'}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
