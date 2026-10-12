import { PACKAGES } from '../../utils/data.js';

export default function OrderSummary({ selectedIdx, players, onPlaceOrder, submitting }) {
  const selectedPkg = selectedIdx === null ? null : PACKAGES[selectedIdx];
  const jerseys = players.length;
  const shorts = players.filter((p) => p.ssize).length;
  const base = selectedPkg ? selectedPkg.price * jerseys : 0;
  const gst = Math.round(base * 0.05);
  const delivery = base > 0 ? 250 : 0;
  const total = base + gst + delivery;

  return (
    <div className="summary-box">
      <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 15, textTransform: 'none', marginBottom: 20 }}>
        Order Summary
      </h3>
      <div className="summary-row"><span>Package</span><span>{selectedPkg ? selectedPkg.name : '—'}</span></div>
      <div className="summary-row"><span>Total Jerseys</span><span>{jerseys}</span></div>
      <div className="summary-row"><span>Total Shorts</span><span>{shorts}</span></div>
      <div className="summary-row"><span>Package Price</span><span>₹{base.toLocaleString('en-IN')}</span></div>
      <div className="summary-row"><span>GST (5%)</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
      <div className="summary-row"><span>Delivery Charge</span><span>{delivery ? `₹${delivery}` : '₹0'}</span></div>
      <div className="summary-row total"><span>Grand Total</span><span className="amt">₹{total.toLocaleString('en-IN')}</span></div>
      <div className="pay-icons">
        <span>UPI</span><span>GPay</span><span>PhonePe</span><span>Paytm</span><span>Razorpay</span><span>Cards</span><span>Net Banking</span><span>COD*</span>
      </div>
      <button className="place-order-btn" onClick={onPlaceOrder} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Place Order'}
      </button>
    </div>
  );
}
