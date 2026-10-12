import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal.js';
import { ICONS_BY_NAME, ArrowRightIcon } from '../common/Icons.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function CategoryGrid() {
  const headRef = useReveal();
  const gridRef = useReveal();
  const { categories } = useApp();

  return (
    <section className="section-pad" id="categories" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-head reveal" ref={headRef}>
          <div>
            <span className="tag">Shop by Category</span>
            <h2>Gear Up For<br />Every Game</h2>
          </div>
          <p>From matchday jerseys to training essentials — built for club, court and street.</p>
        </div>
        <div className="cat-grid reveal" ref={gridRef}>
          {categories.map((cat) => {
            const Icon = ICONS_BY_NAME[cat.icon] || ICONS_BY_NAME.shirt;
            return (
              <Link className="cat-card" key={cat.slug} to={`/category/${cat.slug}`}>
                <Icon className="cat-icon" />
                {cat.image ? (
                  <img className="art art-img" src={cat.image} alt={cat.name} loading="lazy" />
                ) : (
                  <div className="art" style={{ background: cat.gradient }} />
                )}
                <div className="scrim" />
                <div className="info">
                  <h3>{cat.name}</h3>
                  <span className="cat-shop">Shop Now <ArrowRightIcon /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
