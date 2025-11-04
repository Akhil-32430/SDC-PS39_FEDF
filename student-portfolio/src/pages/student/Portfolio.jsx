import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'demo_portfolio_v1'

export default function Portfolio() {
  const [profile, setProfile] = useState({ bio: '', skills: '', images: [] })
  const [imageName, setImageName] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setProfile(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  function handleChange(e) {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleAddImage(e) {
    const f = e.target.files[0]
    if (!f) return
    // only store filename (since we are frontend-only)
    setProfile(prev => ({ ...prev, images: [f.name, ...prev.images] }))
    setImageName('')
  }

  function removeImage(name) {
    setProfile(prev => ({ ...prev, images: prev.images.filter(i => i !== name) }))
  }

  return (
    <div>
      <h2>Portfolio</h2>

      <div className="card">
        <h3>Edit Portfolio</h3>
        <label>
          Bio
          <textarea name="bio" value={profile.bio} onChange={handleChange} rows="4" />
        </label>
        <label>
          Skills (comma-separated)
          <input name="skills" value={profile.skills} onChange={handleChange} />
        </label>
        <label>
          Add Image (simulated)
          <input type="file" onChange={handleAddImage} />
        </label>
        <div className="muted">Images are simulated by filename only in this demo.</div>
      </div>

      <div className="card">
        <h3>Preview</h3>
        <p>{profile.bio || <span className="muted">No bio yet.</span>}</p>
        <p><strong>Skills:</strong> {profile.skills || <span className="muted">None</span>}</p>

        <div className="thumbs">
          {profile.images.length === 0 && <div className="muted">No images uploaded.</div>}
          {profile.images.map((img, idx) => (
            <div className="thumb" key={idx}>
              <div className="thumb-placeholder">{img.split('.').slice(0, -1).join('.') || img}</div>
              <button className="btn-small" onClick={() => removeImage(img)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
