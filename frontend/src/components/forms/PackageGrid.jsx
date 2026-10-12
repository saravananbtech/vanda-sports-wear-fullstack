import { PACKAGES } from '../../utils/data.js';

export default function PackageGrid({ selectedIdx, onSelect }) {
  return (
    <div className="pkg-grid">
      {PACKAGES.map((p, i) => (
        <div
          key={p.name}
          className={`pkg-card${selectedIdx === i ? ' selected' : ''}`}
          onClick={() => onSelect(i)}
        >
          {p.badge && <span className="pkg-badge">{p.badge}</span>}
          {p.img && (
            <div className="pkg-img">
              <img src={p.img} alt={p.name} loading="lazy" />
            </div>
          )}
          <h4>{p.name}</h4>
          <div className="incl">{p.incl}</div>
          <div className="price">₹{p.price} <small>/ jersey</small></div>
        </div>
      ))}
    </div>
  );
}
