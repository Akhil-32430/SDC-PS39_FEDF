import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyProjects from './pages/student/ MyProjects.jsx'
import Portfolio from './pages/student/Portfolio.jsx'
import Milestones from './pages/student/Milestones.jsx'
import ManageSubmissions from './pages/admin/ManageSubmissions.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Protected area */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Student routes */}
            <Route path="/student/projects" element={<MyProjects />} />
            <Route path="/student/portfolio" element={<Portfolio />} />
            <Route path="/student/milestones" element={<Milestones />} />

            {/* Admin routes */}
            <Route path="/admin/manage" element={<ManageSubmissions />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
