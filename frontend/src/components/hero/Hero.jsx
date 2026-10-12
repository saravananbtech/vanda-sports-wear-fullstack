import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, JerseyIcon, BoltIcon, TeamIcon, ShieldIcon } from '../common/Icons.jsx';
import heroAthlete from '../../assets/images/hero-athlete.jpg';

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        size: Math.random() * 4 + 2,
        left: Math.random() * 60 + '%',
        top: Math.random() * 100 + '%',
        delay: Math.random() * 6 + 's',
        duration: 7 + Math.random() * 6 + 's',
      })),
    []
  );
  return (
    <div className="hero-particles" id="heroParticles">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

const FEATURES = [
  { Icon: JerseyIcon, label: 'Premium Quality' },
  { Icon: JerseyIcon, label: 'Custom Jersey Printing' },
  { Icon: BoltIcon, label: 'Fast Delivery Across India' },
  { Icon: TeamIcon, label: 'Bulk Team Orders' },
  { Icon: ShieldIcon, label: 'Secure Payments' },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <Particles />
      <div className="hero-photo" style={{ backgroundImage: `url(${heroAthlete})` }} />
      <div className="container hero-content">
        <span className="eyebrow reveal in">Sublimation · Team Kits · Individual Athletes</span>
        <h1 className="reveal in">PERFORMANCE<br />BUILT FOR<br /><span>CHAMPIONS</span></h1>
        <p className="sub reveal in">
          Premium sports wear for teams, clubs &amp; individual athletes — engineered fabric, custom sublimation, and delivery across India.
        </p>
        <div className="hero-ctas reveal in">
          <a href="#categories" className="btn btn-primary">
            Shop Now <ArrowRightIcon />
          </a>
          <Link to="/customize-jersey" className="btn btn-outline">
            Customize Jersey <JerseyIcon width="14" height="14" />
          </Link>
        </div>
        <div className="hero-features reveal in">
          {FEATURES.map(({ Icon, label }) => (
            <div className="hf-item" key={label}>
              <Icon /><span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scroll"><span className="line" />SCROLL</div>
    </section>
  );
}
