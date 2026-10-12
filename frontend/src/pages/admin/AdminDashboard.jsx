import { useApp } from '../../context/AppContext.jsx';

export default function AdminDashboard() {
  const { orders, jerseyOrders, customers, categories, messages, products } = useApp();
  const revenue = orders.reduce((s, o) => s + o.total, 0) + jerseyOrders.reduce((s, o) => s + o.total, 0);
  const unread = messages.filter((m) => !m.read).length;

  const cards = [
    { label: 'Total Revenue', value: `₹${revenue.toLocaleString('en-IN')}` },
    { label: 'Store Orders', value: orders.length },
    { label: 'Jersey Orders', value: jerseyOrders.length },
    { label: 'Products', value: products.length },
    { label: 'Categories', value: categories.length },
    { label: 'Customers', value: customers.length },
    { label: 'Unread Messages', value: unread },
  ];

  return (
    <div>
      <h1 className="admin-title">Dashboard</h1>
      <div className="admin-cards">
        {cards.map((c) => (
          <div className="admin-card" key={c.label}>
            <div className="v">{c.value}</div>
            <div className="l">{c.label}</div>
          </div>
        ))}
      </div>

      <h2 className="admin-subtitle">Recent Orders</h2>
      <table className="admin-table">
        <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {orders.slice(0, 5).map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.customer}</td><td>₹{o.total.toLocaleString('en-IN')}</td>
              <td><span className={`status-pill ${o.status.toLowerCase()}`}>{o.status}</span></td>
              <td>{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
