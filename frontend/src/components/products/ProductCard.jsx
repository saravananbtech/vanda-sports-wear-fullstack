import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '../common/Icons.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart, buyNow, toggleWishlist, wishlistItems } = useApp();
  const inWishlist = wishlistItems.some((p) => p.id === product.id);

  return (
    <div className="prod-card" data-cat={product.cat}>
      <Link to={`/product/${product.id}`} className="prod-img-wrap">
        {product.tag && <span className="tag-pill">{product.tag}</span>}
        <button
          className="fav-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
        >
          <HeartIcon stroke="white" fill={inWishlist ? 'white' : 'none'} />
        </button>
        {product.imageUrl ? (
          <img className="art art-img" src={product.imageUrl} alt={product.name} loading="lazy" />
        ) : (
          <div className="art" style={{ background: 'linear-gradient(150deg, #1e1911, #0c0b08)' }} />
        )}
      </Link>
      <div className="prod-body">
        <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <h4>{product.name}</h4>
        </Link>
        <div className="prod-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(product.rating)} />
          ))}
          <span>{Number(product.rating).toFixed(1)}</span>
        </div>
        <div className="prod-price">
          <span className="now">₹{product.price}</span>
          {product.was && <span className="was">₹{product.was}</span>}
        </div>
        <div className="prod-sizes">
          {(product.sizes || []).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="prod-actions">
          <button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="btn-buy" onClick={() => buyNow(product)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
