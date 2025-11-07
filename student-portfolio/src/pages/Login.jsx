import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = auth.login(form)
    if (res.ok) {
      navigate(from, { replace: true })
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="card auth-card">
      <h2>Login</h2>
      <p className="muted">Use <strong>student/student</strong> (student) or <strong>admin/admin</strong> (admin)</p>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        {error && <div className="error">{error}</div>}
        <div className="form-actions">
          <button className="btn" type="submit">Sign In</button>
        </div>
      </form>
    </div>
  )
}
