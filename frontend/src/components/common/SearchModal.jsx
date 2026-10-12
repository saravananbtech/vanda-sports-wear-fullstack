import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState('');
  const { products } = useApp();

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(lower) || (p.cat || '').toLowerCase().includes(lower)).slice(0, 6);
  }, [q, products]);

  if (!open) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          type="text"
          placeholder="Search products, categories..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="search-results">
          {q.trim() && results.length === 0 && <p className="search-empty">No products match &quot;{q}&quot;.</p>}
          {results.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="search-result-row" onClick={onClose}>
              <span>{p.name}</span>
              <span className="muted">₹{p.price} · {p.cat}</span>
            </Link>
          ))}
        </div>
        <button className="search-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
