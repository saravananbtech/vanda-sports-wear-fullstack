import { useApp } from '../../context/AppContext.jsx';

export default function AdminReports() {
  const { orders, jerseyOrders } = useApp();
  const storeRevenue = orders.reduce((s, o) => s + o.total, 0);
  const jerseyRevenue = jerseyOrders.reduce((s, o) => s + o.total, 0);
  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="admin-title">Reports</h1>
      <div className="admin-cards">
        <div className="admin-card"><div className="v">₹{storeRevenue.toLocaleString('en-IN')}</div><div className="l">Store Revenue</div></div>
        <div className="admin-card"><div className="v">₹{jerseyRevenue.toLocaleString('en-IN')}</div><div className="l">Jersey Program Revenue</div></div>
        <div className="admin-card"><div className="v">₹{(storeRevenue + jerseyRevenue).toLocaleString('en-IN')}</div><div className="l">Total Revenue</div></div>
      </div>

      <h2 className="admin-subtitle">Orders by Status</h2>
      <table className="admin-table">
        <thead><tr><th>Status</th><th>Count</th></tr></thead>
        <tbody>
          {Object.entries(byStatus).map(([status, count]) => (
            <tr key={status}><td>{status}</td><td>{count}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="admin-note" style={{ marginTop: 20 }}>
        Connect the Django reporting endpoints to replace these in-memory figures with real, persisted analytics.
      </p>
    </div>
  );
}
