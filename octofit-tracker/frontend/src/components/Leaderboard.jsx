import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Leaderboard() {
  const [rows, setRows] = useState([]); const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { Promise.all([fetchResource('leaderboard'), fetchResource('users')]).then(([scores, people]) => { setRows(scores.sort((a, b) => b.points - a.points)); setUsers(people) }).catch((reason) => setError(reason.message)) }, [])
  const names = Object.fromEntries(users.map((user) => [String(user._id || user.id), user.name]))
  return <section><p className="eyebrow">FRIENDLY COMPETITION</p><h1 className="page-title">Leaderboard</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="ranking-list">{rows.map((row, index) => <article className="rank-row" key={row._id || row.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{names[String(row.userId)] || 'OctoFit member'}</strong><b>{row.points} pts</b></article>)}{!rows.length && !error && <p className="empty-state">The leaderboard is ready for its first points.</p>}</div></section>
}