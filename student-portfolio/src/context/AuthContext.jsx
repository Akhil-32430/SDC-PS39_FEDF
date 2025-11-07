import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  // Initialize from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('auth')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setUser(parsed.user)
        setToken(parsed.token)
      } catch (err) {
        console.error('Failed to parse auth from localStorage', err)
      }
    }
  }, [])

  const login = ({ username, password }) => {
    // Demo fake authentication.
    // Replace this with real API call (fetch/axios) and store real token.
    if (username === 'student' && password === 'student') {
      const fakeToken = 'token-demo-123'
      const userObj = { name: 'Student', username: 'student', role: 'student' }
      setUser(userObj)
      setToken(fakeToken)
      localStorage.setItem('auth', JSON.stringify({ user: userObj, token: fakeToken }))
      return { ok: true }
    }

    // also allow admin example
    if (username === 'admin' && password === 'admin') {
      const fakeToken = 'token-admin-456'
      const userObj = { name: 'Admin User', username: 'admin', role: 'admin' }
      setUser(userObj)
      setToken(fakeToken)
      localStorage.setItem('auth', JSON.stringify({ user: userObj, token: fakeToken }))
      return { ok: true }
    }

    return { ok: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth')
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  return useContext(AuthContext)
}
