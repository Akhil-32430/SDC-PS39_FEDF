import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const auth = useAuth()

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/dashboard" className="brand">StudPort</Link>
      </div>

      <nav className="nav-right">
        {auth.user ? (
          <>
            {auth.user.role === 'student' && (
              <>
                <Link to="/student/projects">My Projects</Link>
                <Link to="/student/portfolio">Portfolio</Link>
                <Link to="/student/milestones">Milestones</Link>
              </>
            )}

            {auth.user.role === 'admin' && (
              <Link to="/admin/manage">Manage Submissions</Link>
            )}

            <Link to="/dashboard">Dashboard</Link>
            <button className="btn-link" onClick={() => auth.logout()}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  )
}
