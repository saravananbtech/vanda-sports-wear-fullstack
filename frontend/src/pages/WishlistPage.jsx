import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import ProductCard from '../components/products/ProductCard.jsx';

export default function WishlistPage() {
  const { wishlistItems } = useApp();

  if (wishlistItems.length === 0) {
    return (
      <div className="page-pad container empty-state">
        <h1 className="page-title">Your Wishlist is Empty</h1>
        <p className="page-sub">Tap the heart icon on any product to save it here.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-pad container">
      <h1 className="page-title">Your Wishlist</h1>
      <div className="prod-grid" style={{ marginTop: 30 }}>
        {wishlistItems.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
