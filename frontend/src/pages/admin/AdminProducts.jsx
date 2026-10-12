import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { admin } from '../../services/api.js';

export default function AdminProducts() {
  const { products, productsLive, refetchProducts, showToast } = useApp();
  const [uploadingId, setUploadingId] = useState(null);

  const uploadImage = async (productId, file) => {
    if (!file) return;
    setUploadingId(productId);
    try {
      await admin.uploadProductImage(productId, file);
      await refetchProducts();
      showToast('Product image uploaded');
    } catch (err) {
      showToast(err.status === 401 || err.status === 403 ? 'Log in as an admin first (Login page)' : 'Could not upload image');
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div>
      <h1 className="admin-title">Products</h1>
      <p className="admin-note">
        {productsLive
          ? 'Connected to the live backend. Upload an image per product below — it appears on the storefront immediately.'
          : 'Showing built-in fallback data (backend not running, or its database is empty — run: python manage.py seed_data).'}
        {' '}Write actions require an admin login (use the Login page with your superuser account first).
      </p>
      <table className="admin-table">
        <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Rating</th><th>Tag</th><th style={{ width: 170 }}>Upload Image</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                {p.imageUrl
                  ? <img className="admin-thumb" src={p.imageUrl} alt={p.name} />
                  : <div className="admin-thumb" />}
              </td>
              <td>{p.name}</td>
              <td className="muted">{p.cat}{p.sub ? ` / ${p.sub}` : ''}</td>
              <td>₹{p.price}</td>
              <td>{p.rating}</td>
              <td className="muted">{p.tag || '—'}</td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingId === p.id}
                  onChange={(e) => uploadImage(p.id, e.target.files[0])}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
