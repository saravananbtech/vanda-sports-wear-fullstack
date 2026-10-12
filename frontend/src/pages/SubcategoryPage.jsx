import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { ChevronLeftIcon } from '../components/common/Icons.jsx';

function SubcategoryNotFound({ catSlug, categoryName }) {
  return (
    <div className="page-pad container empty-state">
      <h1 className="page-title">Subcategory Not Found</h1>
      <p className="page-sub">That subcategory doesn't exist under {categoryName || 'this category'}.</p>
      <Link to={`/category/${catSlug}`} className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
        Back to {categoryName || 'Category'}
      </Link>
    </div>
  );
}

export default function SubcategoryPage() {
  const { catSlug, subSlug } = useParams();
  const { categories, products } = useApp();
  const category = categories.find((c) => c.slug === catSlug);

  useEffect(() => { window.scrollTo(0, 0); }, [catSlug, subSlug]);

  if (!category) {
    return (
      <div className="page-pad container empty-state">
        <h1 className="page-title">Category Not Found</h1>
        <p className="page-sub">We couldn't find a category at &quot;{catSlug}&quot;.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Back to Home</Link>
      </div>
    );
  }

  const subcats = category.subcategories?.length
    ? category.subcategories
    : (category.subcats || []).map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') }));
  const sub = subcats.find((s) => s.slug === subSlug);
  if (!sub) return <SubcategoryNotFound catSlug={catSlug} categoryName={category.name} />;

  // Data set is intentionally small; fall back to the whole category so the
  // page never renders empty while you flesh out more products per subcat.
  let filtered = products.filter((p) => p.cat === category.name && p.sub === sub.name);
  let usedFallback = false;
  if (filtered.length === 0) {
    filtered = products.filter((p) => p.cat === category.name);
    usedFallback = true;
  }

  return (
    <div className="page-pad container">
      <Link to={`/category/${catSlug}`} className="back-link" style={{ marginBottom: 14, display: 'inline-flex' }}>
        <ChevronLeftIcon /> Back to {category.name}
      </Link>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/category/${catSlug}`}>{category.name}</Link> / <span>{sub.name}</span>
      </div>
      <h1 className="page-title">{category.name} — {sub.name}</h1>
      <p className="page-sub">
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        {usedFallback && filtered.length > 0 ? ' (showing the wider category — nothing tagged to this subcategory yet)' : ''}
      </p>

      {filtered.length === 0 ? (
        <p className="page-sub" style={{ marginTop: 30 }}>No products here yet — check back soon.</p>
      ) : (
        <div className="prod-grid" style={{ marginTop: 30 }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
