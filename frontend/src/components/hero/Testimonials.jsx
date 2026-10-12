import { useReveal } from '../../hooks/useReveal.js';
import { StarIcon } from '../common/Icons.jsx';
import { TESTIMONIALS } from '../../utils/data.js';

export default function Testimonials() {
  const headRef = useReveal();
  const trackRef = useReveal();

  return (
    <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-head reveal" ref={headRef}>
          <div><span className="tag">Trusted By Teams</span><h2>Customer Reviews</h2></div>
        </div>
        <div className="testi-track reveal" ref={trackRef}>
          {TESTIMONIALS.map((t) => (
            <div className="testi-card" key={t.name}>
              <div className="testi-quote-mark">&rdquo;</div>
              <div className="testi-stars">
                {Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled />)}
              </div>
              <p className="quote">&quot;{t.quote}&quot;</p>
              <div className="testi-person">
                <div className="testi-avatar">{t.name.split(' ').map((w) => w[0]).join('')}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="team">{t.team}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
