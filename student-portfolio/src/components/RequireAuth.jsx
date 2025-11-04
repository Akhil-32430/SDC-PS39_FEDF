import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth() {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // redirect to login, keep attempted url in state
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
