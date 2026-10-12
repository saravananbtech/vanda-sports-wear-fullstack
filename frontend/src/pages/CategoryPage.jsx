import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { ArrowRightIcon, ChevronLeftIcon } from '../components/common/Icons.jsx';

function CategoryNotFound({ catSlug }) {
  return (
    <div className="page-pad container empty-state">
      <h1 className="page-title">Category Not Found</h1>
      <p className="page-sub">We couldn't find a category at &quot;{catSlug}&quot;.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Back to Home</Link>
    </div>
  );
}

export default function CategoryPage() {
  const { catSlug } = useParams();
  const { categories, products } = useApp();
  const category = categories.find((c) => c.slug === catSlug);

  useEffect(() => { window.scrollTo(0, 0); }, [catSlug]);

  if (!category) return <CategoryNotFound catSlug={catSlug} />;

  // Real subcategory objects from the API (each has its own slug/image);
  // falls back to a plain name list if the backend hasn't loaded yet.
  const subcats = category.subcategories?.length
    ? category.subcategories
    : (category.subcats || []).map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') }));

  return (
    <div className="page-pad container">
      <Link to="/" className="back-link" style={{ marginBottom: 14, display: 'inline-flex' }}>
        <ChevronLeftIcon /> Back to Home
      </Link>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/#categories">Categories</Link> / <span>{category.name}</span>
      </div>
      <h1 className="page-title">{category.name}</h1>
      <p className="page-sub">Choose a subcategory to browse products.</p>

      {subcats.length === 0 ? (
        <p className="page-sub" style={{ marginTop: 30 }}>No subcategories yet — check back soon.</p>
      ) : (
        <div className="cat-grid" style={{ marginTop: 30 }}>
          {subcats.map((sub) => {
            const count = products.filter((p) => p.cat === category.name && p.sub === sub.name).length;
            return (
              <Link className="cat-card" key={sub.slug} to={`/category/${category.slug}/${sub.slug}`}>
                {sub.image ? (
                  <img className="art art-img" src={sub.image} alt={sub.name} loading="lazy" />
                ) : (
                  <div className="art" style={{ background: category.gradient }} />
                )}
                <div className="scrim" />
                <div className="info">
                  <h3>{sub.name}</h3>
                  <span className="cat-shop">{count || 'View'} products <ArrowRightIcon /></span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
