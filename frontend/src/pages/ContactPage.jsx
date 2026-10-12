import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { contact } from '../services/api.js';

export default function ContactPage() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contact.send(form);
      showToast("Message sent — we'll get back to you soon");
      setForm({ name: '', email: '', subject: '' });
    } catch (err) {
      showToast('Could not send message — is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-pad container" style={{ maxWidth: 620 }}>
      <h1 className="page-title">Contact Us</h1>
      <p className="page-sub">Questions about bulk orders, sizing, or delivery — reach out and we'll respond fast.</p>

      <form className="form-section" onSubmit={onSubmit} style={{ marginTop: 24 }}>
        <div className="grid-2">
          <div className="field">
            <label>Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div className="field">
          <label>Message</label>
          <input type="text" required placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </div>
        <button type="submit" className="place-order-btn" disabled={submitting} style={{ marginTop: 10 }}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
