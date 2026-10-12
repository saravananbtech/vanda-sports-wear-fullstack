import { useApp } from '../../context/AppContext.jsx';

export default function AdminSettings() {
  const { showToast } = useApp();

  const onSubmit = (e) => {
    e.preventDefault();
    showToast('Settings saved — connect the settings API to persist this');
  };

  return (
    <div>
      <h1 className="admin-title">Settings</h1>
      <form className="form-section" onSubmit={onSubmit} style={{ maxWidth: 560 }}>
        <div className="field"><label>Store Name</label><input type="text" defaultValue="Vanda Sports Wear" /></div>
        <div className="field"><label>Support Email</label><input type="email" defaultValue="support@vandasports.in" /></div>
        <div className="field"><label>Support WhatsApp</label><input type="tel" defaultValue="+91 90000 00000" /></div>
        <div className="field"><label>Minimum Jersey Order Quantity</label><input type="number" defaultValue={10} /></div>
        <button type="submit" className="place-order-btn" style={{ marginTop: 10 }}>Save Settings</button>
      </form>
    </div>
  );
}
