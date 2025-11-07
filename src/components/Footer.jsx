import React from 'react'

export default function Footer() {
  return (
    <footer className="footer card small" style={{ marginTop: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ color: 'var(--primary)' }}>Student Showcase</strong>
          <div className="muted">Built with React + Vite</div>
        </div>
        <div className="muted">© {new Date().getFullYear()} KL University</div>
      </div>
    </footer>
  )
}
