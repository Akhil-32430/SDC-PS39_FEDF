import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const auth = useAuth()
  const user = auth.user

  return (
    <div className="dashboard">
      <div className="welcome">
        <h1>Welcome{user ? `, ${user.name}` : ''}!</h1>
        <p className="muted">This frontend demo helps students present projects and enables admins to review them.</p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Your Role</h3>
          <p>{user?.role || 'guest'}</p>
          <Link to={user?.role === 'admin' ? '/admin/manage' : '/student/projects'} className="small-link">
            Go to {user?.role === 'admin' ? 'Manage' : 'My Projects'}
          </Link>
        </div>

        <div className="card">
          <h3>Quick Actions</h3>
          <ul>
            {user?.role === 'student' ? (
              <>
                <li><Link to="/student/projects">Upload new project</Link></li>
                <li><Link to="/student/portfolio">Edit portfolio</Link></li>
              </>
            ) : (
              <li><Link to="/admin/manage">Review submissions</Link></li>
            )}
          </ul>
        </div>

        <div className="card">
          <h3>Notes</h3>
          <p className="muted">All uploads are simulated locally (frontend only). Refresh will persist some demo data to localStorage.</p>
        </div>
      </div>
    </div>
  )
}
