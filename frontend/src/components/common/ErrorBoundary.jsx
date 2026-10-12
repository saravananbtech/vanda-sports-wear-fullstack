import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Always logged to the browser console — open DevTools (F12) and check
    // the Console tab if you land here, the real cause is printed there.
    console.error('Vanda Sports Wear crashed while rendering:', error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: 40, background: '#0B0B0B', color: '#EDEDED', fontFamily: 'sans-serif',
        }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ color: '#9a9a9a', maxWidth: 520, marginBottom: 8 }}>
            The page hit an error instead of just going blank. Open your browser's
            DevTools console (F12 → Console tab) to see the full error — the message below
            is the short version:
          </p>
          <pre style={{
            background: '#1c1c1c', padding: '14px 18px', borderRadius: 8,
            maxWidth: 640, overflowX: 'auto', color: '#ff9c9c', fontSize: 13, textAlign: 'left',
          }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            onClick={this.handleReset}
            style={{
              marginTop: 24, background: '#D4AF37', color: '#150f00', border: 'none',
              padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
