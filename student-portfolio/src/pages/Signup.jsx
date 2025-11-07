import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', password: '', confirm: '' })
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    const res = auth.register({ name: form.name || form.username, username: form.username, password: form.password })
    if (res.ok) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="card auth-card">
      <h2>Create account</h2>
      <p className="muted">Register a new account — you'll be logged in immediately.</p>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Full name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          Confirm password
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required />
        </label>
        {error && <div className="error">{error}</div>}
        <div className="form-actions">
          <button className="btn" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}
