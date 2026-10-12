import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { StarIcon, HeartIcon } from '../components/common/Icons.jsx';
import ProductCard from '../components/products/ProductCard.jsx';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, categories, addToCart, buyNow, toggleWishlist, wishlistItems } = useApp();
  const product = products.find((p) => String(p.id) === id);
  const [size, setSize] = useState(product?.sizes?.[0] || 'M');

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) return <Navigate to="/" replace />;
  const inWishlist = wishlistItems.some((p) => p.id === product.id);
  const sameSub = products.filter((p) => p.sub === product.sub && p.id !== product.id);
  const sameCat = products.filter((p) => p.cat === product.cat && p.sub !== product.sub);
  const related = [...sameSub, ...sameCat].slice(0, 4);
  const catSlug = categories.find((c) => c.name === product.cat)?.slug || product.cat.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="page-pad container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/category/${catSlug}`}>{product.cat}</Link> / <span>{product.name}</span>
      </div>

      <div className="pdp-layout">
        {product.imageUrl ? (
          <img className="pdp-art" src={product.imageUrl} alt={product.name} style={{ objectFit: 'cover' }} />
        ) : (
          <div className="pdp-art" style={{ background: 'linear-gradient(150deg, #1e1911, #0c0b08)' }} />
        )}
        <div className="pdp-info">
          {product.tag && <span className="tag-pill" style={{ position: 'static', display: 'inline-block', marginBottom: 14 }}>{product.tag}</span>}
          <h1>{product.name}</h1>
          <div className="prod-rating" style={{ margin: '10px 0 16px' }}>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < Math.round(product.rating)} />
            ))}
            <span>{Number(product.rating).toFixed(1)}</span>
          </div>
          <div className="prod-price" style={{ fontSize: 22, marginBottom: 18 }}>
            <span className="now">₹{product.price}</span>
            {product.was && <span className="was">₹{product.was}</span>}
          </div>
          <p className="pdp-desc">{product.desc}</p>

          <div className="field" style={{ maxWidth: 320 }}>
            <label>Size</label>
            <div className="size-pick">
              {(product.sizes || []).map((s) => (
                <button key={s} className={s === size ? 'active' : ''} onClick={() => setSize(s)} type="button">{s}</button>
              ))}
            </div>
          </div>

          <div className="pdp-actions">
            <button className="btn-cart" onClick={() => addToCart(product, size)}>Add to Cart</button>
            <button className="btn-buy" onClick={() => buyNow(product, size)}>Buy Now</button>
            <button className="icon-btn" title="Wishlist" onClick={() => toggleWishlist(product)}>
              <HeartIcon fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 70 }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: 24 }}>Other colours &amp; styles</h2>
          <div className="prod-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
