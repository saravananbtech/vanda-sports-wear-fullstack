import { useReveal } from '../../hooks/useReveal.js';
import { ARRIVALS } from '../../utils/data.js';

export default function NewArrivals() {
  const headRef = useReveal();
  const rowRef = useReveal();

  return (
    <section className="section-pad" id="arrivals">
      <div className="container">
        <div className="section-head reveal" ref={headRef}>
          <div><span className="tag">Just Landed</span><h2>New Arrivals</h2></div>
          <p>The latest kits, fresh off the print — updated weekly.</p>
        </div>
        <div className="arrivals-row reveal" ref={rowRef}>
          {ARRIVALS.map((a) => (
            <div className="arrival-card" key={a.title}>
              {a.imageUrl ? (
                <img className="art art-img" src={a.imageUrl} alt={a.title} loading="lazy" />
              ) : (
                <div className="art" style={{ background: a.gradient }} />
              )}
              <div className="scrim" />
              <div className="info">
                <span className="small-tag">{a.tag}</span>
                <h3>{a.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
