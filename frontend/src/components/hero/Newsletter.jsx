import { useReveal } from '../../hooks/useReveal.js';
import { useApp } from '../../context/AppContext.jsx';

export default function Newsletter() {
  const ref = useReveal();
  const { showToast } = useApp();

  const onSubmit = (e) => {
    e.preventDefault();
    showToast('Subscribed — welcome to the squad.');
    e.target.reset();
  };

  return (
    <section className="section-pad">
      <div className="container">
        <div className="newsletter reveal" ref={ref}>
          <h2>Join the VANDA Community</h2>
          <p>Drops, offers and team-order deals — straight to your inbox.</p>
          <form className="news-form" onSubmit={onSubmit}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
