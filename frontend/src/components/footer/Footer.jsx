export default function Footer({ hidden }) {
  if (hidden) return null;

  return (
    <footer id="footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="nav-logo">
              <div className="brandline">VANDA<span className="sw">SPORTS WEAR</span></div>
            </div>
            <p>Premium sportswear and custom sublimation jerseys for teams, clubs and athletes — delivered across India.</p>
            <div className="foot-social">
              <a href="#" title="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="#" title="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href="#" title="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.1.9 4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2 2.6a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.6a12.7 12.7 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6A9.2 9.2 0 0 0 23 3z" /></svg>
              </a>
              <a href="#" title="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="4" /><polygon points="10,9 16,12 10,15" /></svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="#">About</a><a href="#">Careers</a><a href="#">Contact</a>
          </div>
          <div className="foot-col">
            <h5>Shop</h5>
            <a href="#">T-Shirts</a>
            <a href="#">Track Pants</a>
            <a href="#">Shorts</a>
            <a href="#">Jackets</a>
          </div>
          <div className="foot-col">
            <h5>Customer Support</h5>
            <a href="#">FAQs</a><a href="#">Shipping</a><a href="#">Returns</a><a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 VANDA SPORTS WEAR. All Rights Reserved.</span>
          <span>Made for teams, clubs &amp; champions across India.</span>
        </div>
      </div>
    </footer>
  );
}
