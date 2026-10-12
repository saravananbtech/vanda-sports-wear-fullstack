import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function CheckoutPage() {
  const { cartItems } = useApp();
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((s, it) => s + it.product.price * it.qty, 0);
  const delivery = cartItems.length ? 150 : 0;
  const total = subtotal + delivery;

  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  return (
    <div className="page-pad container">
      <h1 className="page-title">Checkout</h1>
      <div className="order-layout">
        <form className="form-section" onSubmit={onSubmit}>
          <h3><span className="num">1</span>Delivery Details</h3>
          <div className="grid-2">
            <div className="field"><label>Full Name</label><input type="text" required placeholder="Full name" /></div>
            <div className="field"><label>Mobile Number</label><input type="tel" required placeholder="10-digit mobile" /></div>
          </div>
          <div className="field"><label>Address</label><input type="text" required placeholder="House no, street, area" /></div>
          <div className="grid-3">
            <div className="field"><label>State</label><input type="text" required placeholder="State" /></div>
            <div className="field"><label>City</label><input type="text" required placeholder="City" /></div>
            <div className="field"><label>Pincode</label><input type="text" required placeholder="6-digit pincode" /></div>
          </div>
          <button type="submit" className="place-order-btn" style={{ marginTop: 10 }}>Continue to Payment</button>
        </form>
        <div className="summary-box">
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 15, textTransform: 'none', marginBottom: 20 }}>Order Summary</h3>
          <div className="summary-row"><span>Items</span><span>{cartItems.reduce((s, it) => s + it.qty, 0)}</span></div>
          <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          <div className="summary-row"><span>Delivery</span><span>₹{delivery}</span></div>
          <div className="summary-row total"><span>Total</span><span className="amt">₹{total.toLocaleString('en-IN')}</span></div>
        </div>
      </div>
    </div>
  );
}
