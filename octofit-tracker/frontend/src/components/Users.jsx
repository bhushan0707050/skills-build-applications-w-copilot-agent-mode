import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchResource('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <section><p className="eyebrow">THE COMMUNITY</p><h1 className="page-title">Members</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="member-grid">{users.map((user) => <article className="member" key={user._id || user.id}>{user.avatar ? <img src={user.avatar} alt="" /> : <span className="avatar">{user.name?.charAt(0)}</span>}<div><strong>{user.name}</strong><span>{user.email}</span></div></article>)}{!users.length && !error && <p className="empty-state">No members found.</p>}</div></section>
}