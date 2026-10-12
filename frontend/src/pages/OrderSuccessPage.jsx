import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  const orderId = 'VSW-' + Math.floor(1000 + Math.random() * 9000);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-pad container empty-state">
      <div className="success-check">✓</div>
      <h1 className="page-title">Order Placed Successfully</h1>
      <p className="page-sub">Order ID <strong style={{ color: 'var(--gold)' }}>{orderId}</strong> — a confirmation has been sent to your email.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>Back to Home</Link>
    </div>
  );
}
