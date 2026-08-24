import { useEffect, useState } from 'react'
import { fetchEndpoint, API_BASE_URL } from '../api.js'

const TEAMS_API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${API_BASE_URL}/teams/`

export default function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(TEAMS_API_ENDPOINT).then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section><p className="eyebrow">FIND YOUR CREW</p><h1 className="page-title">Teams</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id || team.id}><p className="card-index">TEAM</p><h2>{team.name}</h2><p>{team.description || 'A team that keeps moving together.'}</p><strong>{team.members?.length || 0} members</strong></article>)}{!teams.length && !error && <p className="empty-state">No teams have been created yet.</p>}</div></section>
}