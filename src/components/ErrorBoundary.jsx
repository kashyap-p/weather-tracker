import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error: error.message || 'Unknown error' }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div className="app" style={{ '--gradient-1': '#0f172a', '--gradient-2': '#1e293b' }}>
          <div className="container" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: '#ef4444', marginBottom: 16, fontSize: '1.3rem' }}>Something went wrong</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontSize: '0.9rem', wordBreak: 'break-word' }}>{this.state.error}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 24, fontSize: '0.75rem' }}>Check the browser console (F12) for details.</p>
            <button onClick={() => { this.setState({ error: null }); window.location.reload() }}
              style={{ padding: '12px 28px', background: '#60a5fa', border: 'none', borderRadius: 12, color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
