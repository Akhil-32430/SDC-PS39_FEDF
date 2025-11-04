import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'demo_projects_v1'

export default function MyProjects() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title: '', description: '' })
  const [fileName, setFileName] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setProjects(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (file) setFileName(file.name)
  }

  function handleAdd(e) {
    e.preventDefault()
    const newProj = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      file: fileName,
      status: 'Submitted',
      feedback: '',
      progress: 0
    }
    setProjects(prev => [newProj, ...prev])
    setForm({ title: '', description: '' })
    setFileName(null)
  }

  function updateProgress(id, value) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, progress: value } : p))
  }

  return (
    <div>
      <h2>My Projects</h2>

      <div className="card">
        <h3>Upload New Project</h3>
        <form className="form" onSubmit={handleAdd}>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" required />
          </label>
          <label>
            File (simulated)
            <input type="file" onChange={handleFile} />
            {fileName && <div className="muted">Selected: {fileName}</div>}
          </label>
          <div className="form-actions">
            <button className="btn" type="submit">Add Project</button>
          </div>
        </form>
      </div>

      <div className="card-list">
        {projects.length === 0 && <div className="muted">No projects yet.</div>}
        {projects.map(p => (
          <div className="card small" key={p.id}>
            <div className="card-row">
              <div>
                <h4>{p.title}</h4>
                <p className="muted">{p.description}</p>
                {p.file && <p className="muted">File: {p.file}</p>}
              </div>
              <div className="right">
                <div className="badge">{p.status}</div>
                <div className="muted">Progress: {p.progress}%</div>
                <input type="range" min="0" max="100" value={p.progress} onChange={(e)=>updateProgress(p.id, Number(e.target.value))} />
                {p.feedback && <div className="feedback">Feedback: {p.feedback}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
