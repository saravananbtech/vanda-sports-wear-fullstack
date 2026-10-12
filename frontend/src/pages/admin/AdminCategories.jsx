import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { admin } from '../../services/api.js';

export default function AdminCategories() {
  const { categories, categoriesLive, refetchCategories, showToast } = useApp();
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingSlug, setUploadingSlug] = useState(null);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await admin.createCategory({ name, is_active: true, image: imageFile || undefined });
      await refetchCategories();
      setName('');
      setImageFile(null);
      e.target.reset();
      showToast('Category added — now live on the storefront navbar');
    } catch (err) {
      showToast(err.status === 401 || err.status === 403 ? 'Log in as an admin first (Login page)' : 'Could not add category');
    } finally {
      setSubmitting(false);
    }
  };

  const replaceImage = async (slug, file) => {
    if (!file) return;
    setUploadingSlug(slug);
    try {
      await admin.updateCategory(slug, { image: file });
      await refetchCategories();
      showToast('Category image updated');
    } catch (err) {
      showToast(err.status === 401 || err.status === 403 ? 'Log in as an admin first (Login page)' : 'Could not upload image');
    } finally {
      setUploadingSlug(null);
    }
  };

  const removeCategory = async (slug) => {
    try {
      await admin.deleteCategory(slug);
      await refetchCategories();
      showToast('Category removed');
    } catch (err) {
      showToast(err.status === 401 || err.status === 403 ? 'Log in as an admin first (Login page)' : 'Could not delete category');
    }
  };

  return (
    <div>
      <h1 className="admin-title">Categories</h1>
      <p className="admin-note">
        {categoriesLive
          ? 'Connected to the live backend — changes here update the navbar dropdown and homepage instantly for every visitor.'
          : "Showing built-in fallback data (backend not running, or its database is empty — run: python manage.py seed_data)."}
        {' '}Write actions require an admin login (use the Login page with your superuser account first).
      </p>

      <form className="admin-inline-form" onSubmit={addCategory}>
        <input type="text" placeholder="New category name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        <button type="submit" className="small-btn primary" disabled={submitting}>
          {submitting ? 'Adding...' : '+ Add Category'}
        </button>
      </form>

      <table className="admin-table">
        <thead><tr><th>Image</th><th>Name</th><th>Slug</th><th>Subcategories</th><th style={{ width: 220 }}>Actions</th></tr></thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.slug}>
              <td>
                {c.image
                  ? <img className="admin-thumb" src={c.image} alt={c.name} />
                  : <div className="admin-thumb" />}
              </td>
              <td>{c.name}</td>
              <td className="muted">/{c.slug}</td>
              <td className="muted">{(c.subcats || (c.subcategories || []).map((s) => s.name)).join(', ')}</td>
              <td>
                <div className="admin-upload-row">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingSlug === c.slug}
                    onChange={(e) => replaceImage(c.slug, e.target.files[0])}
                  />
                  <button className="row-remove" onClick={() => removeCategory(c.slug)} type="button">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
