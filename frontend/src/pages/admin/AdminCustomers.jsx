import { useApp } from '../../context/AppContext.jsx';

export default function AdminCustomers() {
  const { customers } = useApp();

  return (
    <div>
      <h1 className="admin-title">Customers</h1>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Orders</th><th>Joined</th></tr></thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td><td className="muted">{c.email}</td><td>{c.orders}</td><td className="muted">{c.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
