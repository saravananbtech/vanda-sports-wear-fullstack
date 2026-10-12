import { useApp } from '../../context/AppContext.jsx';

const STATUSES = ['Design Review', 'In Production', 'Shipped', 'Delivered'];

export default function AdminJerseyOrders() {
  const { jerseyOrders, setJerseyOrders } = useApp();

  const setStatus = (id, status) => {
    setJerseyOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <h1 className="admin-title">Jersey / Team Orders</h1>
      <table className="admin-table">
        <thead><tr><th>Order ID</th><th>Team</th><th>Players</th><th>Package</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {jerseyOrders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.team}</td><td>{o.players}</td><td className="muted">{o.package}</td>
              <td>₹{o.total.toLocaleString('en-IN')}</td>
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
