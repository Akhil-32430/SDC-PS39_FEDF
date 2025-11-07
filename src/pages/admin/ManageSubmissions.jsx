import React, { useState, useEffect } from 'react'

const PROJECT_KEY = 'demo_projects_v1'

export default function ManageSubmissions() {
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(PROJECT_KEY)
    if (raw) setProjects(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(PROJECT_KEY, JSON.stringify(projects))
  }, [projects])

  function open(p) {
    setSelected(p)
    setFeedback(p.feedback || '')
  }

  function leaveFeedback() {
    setProjects(prev => prev.map(p => p.id === selected.id ? { ...p, feedback, status: 'Reviewed' } : p))
    setSelected(null)
    setFeedback('')
  }

  function setStatus(p, s) {
    setProjects(prev => prev.map(pr => pr.id === p.id ? { ...pr, status: s } : pr))
  }

  return (
    <div>
      <h2>Manage Submissions</h2>
      <div className="admin-grid">
        <div className="card list-card">
          <h3>Submissions</h3>
          {projects.length === 0 && <div className="muted">No submissions yet.</div>}
          {projects.map(p => (
            <div className="card small" key={p.id}>
              <div className="card-row">
                <div>
                  <strong>{p.title}</strong>
                  <div className="muted">{p.description}</div>
                </div>
                <div className="right">
                  <div className="muted">Progress: {p.progress}%</div>
                  <div className="badge">{p.status}</div>
                  <div className="tiny-actions">
                    <button className="btn-small" onClick={()=>open(p)}>Feedback</button>
                    <button className="btn-small" onClick={()=>setStatus(p, 'Accepted')}>Accept</button>
                    <button className="btn-small" onClick={()=>setStatus(p, 'Needs Work')}>Needs Work</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card detail-card">
          <h3>Inspector</h3>
          {!selected && <div className="muted">Select a project to review it and leave feedback.</div>}
          {selected && (
            <>
              <h4>{selected.title}</h4>
              <p className="muted">{selected.description}</p>
              <p><strong>File:</strong> {selected.file || '—'}</p>
              <label>Feedback</label>
              <textarea value={feedback} onChange={e=>setFeedback(e.target.value)} rows="6" />
              <div className="form-actions">
                <button className="btn" onClick={leaveFeedback}>Save Feedback</button>
                <button className="btn-link" onClick={()=>setSelected(null)}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
