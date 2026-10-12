import { useMemo, useRef } from 'react';
import { useReveal } from '../../hooks/useReveal.js';
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons.jsx';
import { useApp } from '../../context/AppContext.jsx';
import ProductCard from './ProductCard.jsx';

export default function BestSellers() {
  const { products } = useApp();
  // Best-seller-tagged items first, then the highest rated — capped at 10 so the
  // carousel stays fast now that the catalog has many products.
  const featured = useMemo(() => {
    const tagged = products.filter((p) => p.tag === 'Best Seller');
    const rest = products.filter((p) => p.tag !== 'Best Seller').sort((a, b) => b.rating - a.rating);
    return [...tagged, ...rest].slice(0, 10);
  }, [products]);
  const headRef = useReveal();
  const trackRef = useReveal();
  const scrollRef = useRef(null);

  const scrollBy = (delta) => scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });

  return (
    <section className="section-pad" id="bestsellers" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-head" ref={headRef} style={{}}>
          <div><span className="tag">Fan Favourites</span><h2>Best Sellers</h2></div>
          <div className="carousel-nav">
            <button onClick={() => scrollBy(-290)}><ChevronLeftIcon /></button>
            <button onClick={() => scrollBy(290)}><ChevronRightIcon /></button>
          </div>
        </div>
        <div
          className="carousel-track reveal"
          ref={(el) => {
            trackRef.current = el;
            scrollRef.current = el;
          }}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
