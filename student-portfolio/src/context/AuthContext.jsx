import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [users, setUsers] = useState([])
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
    // load registered users (demo persistence)
    const rawUsers = localStorage.getItem('users')
    if (rawUsers) {
      try {
        setUsers(JSON.parse(rawUsers))
      } catch (e) {
        console.error('Failed to parse users from localStorage', e)
      }
    } else {
      // seed with demo accounts if none
      const seed = [
        { name: 'Student', username: 'student', password: 'student', role: 'student' },
        { name: 'Admin User', username: 'admin', password: 'admin', role: 'admin' }
      ]
      setUsers(seed)
      localStorage.setItem('users', JSON.stringify(seed))
    }
  }, [])

  const login = ({ username, password }) => {
    // Normalize inputs
    const uname = (username || '').trim()
    const pwd = password || ''

    // Read users from localStorage at login time to avoid stale state issues
    const rawUsers = localStorage.getItem('users')
    let lookup = users
    if (rawUsers) {
      try {
        lookup = JSON.parse(rawUsers)
      } catch (e) {
        console.error('Failed to parse users from localStorage during login', e)
      }
    }
    const found = lookup.find(u => (u.username || '').trim() === uname && (u.password || '') === pwd)
    if (found) {
      const fakeToken = `token-${uname}-${Date.now()}`
      const userObj = { name: found.name, username: found.username, role: found.role }
      setUser(userObj)
      setToken(fakeToken)
      localStorage.setItem('auth', JSON.stringify({ user: userObj, token: fakeToken }))
      console.info('login successful for', uname)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials' }
  }

  const register = ({ name, username, password, role = 'student' }) => {
    const uname = (username || '').trim()
    const pwd = password || ''
    if (!uname || !pwd) return { ok: false, error: 'Missing fields' }
    // check duplicate username
    if (users.find(u => (u.username || '').trim() === uname)) {
      return { ok: false, error: 'Username already exists' }
    }
    const newUser = { name: name || uname, username: uname, password: pwd, role }
    const updated = [...users, newUser]
    setUsers(updated)
    localStorage.setItem('users', JSON.stringify(updated))
    // auto-login newly registered user
    const fakeToken = `token-${uname}-${Date.now()}`
    const userObj = { name: newUser.name, username: newUser.username, role: newUser.role }
    setUser(userObj)
    setToken(fakeToken)
    localStorage.setItem('auth', JSON.stringify({ user: userObj, token: fakeToken }))
    console.info('registered new user', newUser.username)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth')
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  return useContext(AuthContext)
}
