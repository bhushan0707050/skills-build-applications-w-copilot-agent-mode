import { useEffect, useState } from 'react'
import { fetchEndpoint, API_BASE_URL } from '../api.js'

const LEADERBOARD_API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/leaderboard/`

export default function Leaderboard() {
  const [rows, setRows] = useState([]); const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { Promise.all([fetchEndpoint(LEADERBOARD_API_ENDPOINT), fetchEndpoint(`${API_BASE_URL}/users/`)]).then(([scores, people]) => { setRows(scores.sort((a, b) => b.points - a.points)); setUsers(people) }).catch((reason) => setError(reason.message)) }, [])
  const names = Object.fromEntries(users.map((user) => [String(user._id || user.id), user.name]))
  return <section><p className="eyebrow">FRIENDLY COMPETITION</p><h1 className="page-title">Leaderboard</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="ranking-list">{rows.map((row, index) => <article className="rank-row" key={row._id || row.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{names[String(row.userId)] || 'OctoFit member'}</strong><b>{row.points} pts</b></article>)}{!rows.length && !error && <p className="empty-state">The leaderboard is ready for its first points.</p>}</div></section>
}