import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchResource('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section><p className="eyebrow">FIND YOUR CREW</p><h1 className="page-title">Teams</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id || team.id}><p className="card-index">TEAM</p><h2>{team.name}</h2><p>{team.description || 'A team that keeps moving together.'}</p><strong>{team.members?.length || 0} members</strong></article>)}{!teams.length && !error && <p className="empty-state">No teams have been created yet.</p>}</div></section>
}