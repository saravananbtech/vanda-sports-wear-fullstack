import { useReveal } from '../../hooks/useReveal.js';
import { useCountUp } from '../../hooks/useCountUp.js';
import { COUNTERS } from '../../utils/data.js';

function CounterItem({ target, label }) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="counter-item">
      <div className="num" ref={ref}>{value.toLocaleString('en-IN')}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export default function Counters() {
  const wrapRef = useReveal();
  return (
    <section className="section-pad" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="counters reveal" ref={wrapRef}>
          {COUNTERS.map((c) => (
            <CounterItem key={c.label} target={c.target} label={c.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
