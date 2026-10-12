import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { auth } from '../services/api.js';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useApp();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await auth.login(form.username, form.password);
        showToast('Logged in');
      } else {
        await auth.register({ username: form.username, email: form.email, password: form.password });
        await auth.login(form.username, form.password);
        showToast('Account created — welcome to Vanda');
      }
      navigate('/');
    } catch (err) {
      const detail = err.detail && (err.detail.detail || Object.values(err.detail)[0]);
      showToast(typeof detail === 'string' ? detail : 'Could not sign you in — is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-pad container" style={{ maxWidth: 420 }}>
      <h1 className="page-title">{mode === 'login' ? 'Login' : 'Create Account'}</h1>
      <div className="auth-toggle">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')} type="button">Login</button>
        <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')} type="button">Sign Up</button>
      </div>
      <form className="form-section" onSubmit={onSubmit} style={{ marginTop: 20 }}>
        <div className="field">
          <label>Username</label>
          <input type="text" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </div>
        {mode === 'signup' && (
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        )}
        <div className="field">
          <label>Password</label>
          <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button type="submit" className="place-order-btn" disabled={submitting} style={{ marginTop: 10 }}>
          {submitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
