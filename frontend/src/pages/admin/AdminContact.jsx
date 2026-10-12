import { useApp } from '../../context/AppContext.jsx';

export default function AdminContact() {
  const { messages, setMessages } = useApp();

  const markRead = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <div>
      <h1 className="admin-title">Contact Messages</h1>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th style={{ width: 100 }}>Actions</th></tr></thead>
        <tbody>
          {messages.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td><td className="muted">{m.email}</td><td className="muted">{m.subject}</td>
              <td><span className={`status-pill ${m.read ? 'delivered' : 'processing'}`}>{m.read ? 'Read' : 'Unread'}</span></td>
              <td>{!m.read && <button className="small-btn" onClick={() => markRead(m.id)}>Mark Read</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
