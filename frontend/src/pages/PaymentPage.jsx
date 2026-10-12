import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const METHODS = ['UPI', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'];

export default function PaymentPage() {
  const [method, setMethod] = useState('UPI');
  const { cartItems, showToast } = useApp();
  const navigate = useNavigate();
  const total = cartItems.reduce((s, it) => s + it.product.price * it.qty, 0) + (cartItems.length ? 150 : 0);

  const payNow = () => {
    showToast('Payment gateway connects here in a live build');
    navigate('/order-success');
  };

  return (
    <div className="page-pad container" style={{ maxWidth: 560 }}>
      <h1 className="page-title">Payment</h1>
      <p className="page-sub">Amount payable: <strong style={{ color: 'var(--gold)' }}>₹{total.toLocaleString('en-IN')}</strong></p>

      <div className="form-section" style={{ marginTop: 24 }}>
        {METHODS.map((m) => (
          <label className="payment-option" key={m}>
            <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} />
            {m}
          </label>
        ))}
      </div>

      <button className="place-order-btn" onClick={payNow}>Pay ₹{total.toLocaleString('en-IN')}</button>
    </div>
  );
}
