import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'demo_milestones_v1'

export default function Milestones() {
  const [milestones, setMilestones] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setMilestones(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones))
  }, [milestones])

  function addMilestone(e) {
    e.preventDefault()
    if (!text.trim()) return
    setMilestones(prev => [{ id: Date.now(), text, done: false }, ...prev])
    setText('')
  }

  function toggleDone(id) {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m))
  }

  function remove(id) {
    setMilestones(prev => prev.filter(m => m.id !== id))
  }

  const completed = milestones.filter(m => m.done).length
  const percent = milestones.length ? Math.round((completed / milestones.length) * 100) : 0

  return (
    <div>
      <h2>Milestones</h2>
      <div className="card">
        <h3>Track progress</h3>
        <form onSubmit={addMilestone} className="form-inline">
          <input placeholder="Add milestone (e.g. Prototype v1)" value={text} onChange={(e)=>setText(e.target.value)} />
          <button className="btn" type="submit">Add</button>
        </form>

        <div className="progress-box">
          <div className="progress-bar" style={{ width: `${percent}%` }}></div>
          <div className="progress-label">{percent}% complete</div>
        </div>

        <ul className="list">
          {milestones.map(m => (
            <li key={m.id} className={m.done ? 'done' : ''}>
              <label>
                <input type="checkbox" checked={m.done} onChange={()=>toggleDone(m.id)} />
                <span>{m.text}</span>
              </label>
              <button className="btn-small" onClick={()=>remove(m.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
