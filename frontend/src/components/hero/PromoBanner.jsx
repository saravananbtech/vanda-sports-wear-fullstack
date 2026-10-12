import { useReveal } from '../../hooks/useReveal.js';
import { useCountdown } from '../../hooks/useCountdown.js';

export default function PromoBanner() {
  const ref = useReveal();
  const { d, h, m, s } = useCountdown();

  return (
    <section className="section-pad">
      <div className="container">
        <div className="promo reveal" ref={ref}>
          <div className="promo-diag" />
          <div className="promo-left">
            <h2>UP TO<br />40% OFF</h2>
            <p>Season-end pricing on training kits and club jerseys — while stock lasts.</p>
            <a href="#categories" className="btn btn-primary" style={{ marginTop: 26 }}>Shop Now</a>
          </div>
          <div className="promo-right">
            <div className="countdown">
              <div className="box"><div className="num">{d}</div><div className="lbl">Days</div></div>
              <div className="box"><div className="num">{h}</div><div className="lbl">Hours</div></div>
              <div className="box"><div className="num">{m}</div><div className="lbl">Mins</div></div>
              <div className="box"><div className="num">{s}</div><div className="lbl">Secs</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
