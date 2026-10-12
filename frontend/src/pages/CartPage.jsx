import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function CartPage() {
  const { cartItems, updateCartQty, removeFromCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((s, it) => s + it.product.price * it.qty, 0);
  const delivery = cartItems.length ? 150 : 0;
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="page-pad container empty-state">
        <h1 className="page-title">Your Cart is Empty</h1>
        <p className="page-sub">Browse our collection and add something to your cart.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-pad container">
      <h1 className="page-title">Your Cart</h1>
      <div className="order-layout">
        <div className="cart-list">
          {cartItems.map((it) => (
            <div className="cart-row" key={it.key}>
              <div className="cart-thumb" style={{ background: 'linear-gradient(150deg, #1e1911, #0c0b08)' }} />
              <div className="cart-row-info">
                <Link to={`/product/${it.product.id}`}>{it.product.name}</Link>
                <span className="muted">Size: {it.size}</span>
                <span className="muted">₹{it.product.price} each</span>
              </div>
              <div className="qty-control">
                <button onClick={() => updateCartQty(it.key, it.qty - 1)}>−</button>
                <span>{it.qty}</span>
                <button onClick={() => updateCartQty(it.key, it.qty + 1)}>+</button>
              </div>
              <div className="cart-row-total">₹{(it.product.price * it.qty).toLocaleString('en-IN')}</div>
              <button className="row-remove" onClick={() => removeFromCart(it.key)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="summary-box">
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 15, textTransform: 'none', marginBottom: 20 }}>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          <div className="summary-row"><span>Delivery</span><span>₹{delivery}</span></div>
          <div className="summary-row total"><span>Total</span><span className="amt">₹{total.toLocaleString('en-IN')}</span></div>
          <button className="place-order-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
