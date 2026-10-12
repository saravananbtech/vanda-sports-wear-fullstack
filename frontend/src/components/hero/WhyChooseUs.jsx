import { useReveal } from '../../hooks/useReveal.js';
import { ICONS_BY_NAME } from '../common/Icons.jsx';
import { WHY_ITEMS } from '../../utils/data.js';

export default function WhyChooseUs() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="section-pad">
      <div className="container">
        <div className="section-head reveal" ref={headRef}>
          <div>
            <span className="tag">Why Vanda</span>
            <h2>Built Like Gear,<br />Not Just Apparel</h2>
          </div>
          <p>Every stitch is made for teams who train hard and clubs who compete across India — quality that survives the season.</p>
        </div>
        <div className="why-grid reveal" ref={gridRef}>
          {WHY_ITEMS.map((item) => {
            const Icon = ICONS_BY_NAME[item.icon];
            return (
              <div className="why-card" key={item.num}>
                <Icon className="why-icon" />
                <div className="why-num">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
