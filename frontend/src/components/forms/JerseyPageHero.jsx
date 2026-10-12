import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '../common/Icons.jsx';
import jerseyHero from '../../assets/images/jersey-hero.jpg';

export default function JerseyPageHero() {
  const backgroundImage = [
    'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(212,175,55,0.16), transparent 60%)',
    'linear-gradient(180deg, rgba(10,9,6,0.55) 0%, rgba(10,9,6,0.82) 55%, var(--bg) 100%)',
    `url(${jerseyHero})`,
  ].join(', ');

  return (
    <section className="jp-hero" style={{ backgroundImage }}>
      <div className="container">
        <Link to="/" className="back-link">
          <ChevronLeftIcon /> Back to Home
        </Link>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>Team Sublimation Program</span>
        <h1>CUSTOMIZE YOUR JERSEY</h1>
        <p>Pick your sublimation package and upload your team details. We design, print, and deliver your jerseys across India.</p>
      </div>
    </section>
  );
}
