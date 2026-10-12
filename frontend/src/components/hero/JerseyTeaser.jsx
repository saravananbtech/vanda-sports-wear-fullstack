import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal.js';
import { ArrowRightIcon, JerseyIcon } from '../common/Icons.jsx';

export default function JerseyTeaser() {
  const ref = useReveal();
  return (
    <section className="section-pad">
      <div className="container">
        <div className="jersey-teaser reveal" ref={ref}>
          <svg className="chev" viewBox="0 0 100 100"><polygon points="0,100 50,0 100,100" fill="#D4AF37" /></svg>
          <div>
            <span className="tag" style={{ display: 'block', marginBottom: 14 }}>Team Sublimation</span>
            <h2>Customize Your<br />Own Jersey</h2>
            <p>Pick a sublimation package, upload your team logo and colours, and add your full squad. We design, print and deliver across India — minimum 10 jerseys, no maximum.</p>
            <Link to="/customize-jersey" className="btn btn-primary">
              Start Customizing <ArrowRightIcon />
            </Link>
          </div>
          <div className="jersey-visual">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#241e10 0%,#0e0c07 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <JerseyIcon width="140" height="140" stroke="#D4AF37" strokeWidth="1.3" opacity="0.75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
