import { useApp } from '../../context/AppContext.jsx';

export default function AdminReviews() {
  const { reviews, setReviews, showToast } = useApp();

  const toggle = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r)));
  };

  const remove = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted');
  };

  return (
    <div>
      <h1 className="admin-title">Reviews</h1>
      <table className="admin-table">
        <thead><tr><th>Customer</th><th>Product</th><th>Rating</th><th>Review</th><th>Status</th><th style={{ width: 150 }}>Actions</th></tr></thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.customer}</td><td className="muted">{r.product}</td><td>{r.rating}★</td>
              <td className="muted">{r.text}</td>
              <td><span className={`status-pill ${r.approved ? 'delivered' : 'processing'}`}>{r.approved ? 'Approved' : 'Pending'}</span></td>
              <td style={{ display: 'flex', gap: 8 }}>
                <button className="small-btn" onClick={() => toggle(r.id)}>{r.approved ? 'Unapprove' : 'Approve'}</button>
                <button className="row-remove" onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
