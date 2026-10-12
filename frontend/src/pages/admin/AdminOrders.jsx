import { useApp } from '../../context/AppContext.jsx';

const STATUSES = ['Processing', 'Shipped', 'Delivered'];

export default function AdminOrders() {
  const { orders, setOrders } = useApp();

  const setStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <h1 className="admin-title">Orders</h1>
      <table className="admin-table">
        <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.customer}</td><td>{o.items}</td><td>₹{o.total.toLocaleString('en-IN')}</td>
              <td>
                <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
              <td className="muted">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
