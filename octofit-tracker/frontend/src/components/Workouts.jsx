import { useEffect, useState } from 'react'
import { fetchEndpoint, API_BASE_URL } from '../api.js'

const WORKOUTS_API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${API_BASE_URL}/workouts/`

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(WORKOUTS_API_ENDPOINT).then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section><p className="eyebrow">PERSONALIZED SUGGESTIONS</p><h1 className="page-title">Workouts</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id || workout.id}><div className="workout-meta"><span>{workout.difficulty}</span><span>{workout.duration} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p></article>)}{!workouts.length && !error && <p className="empty-state">No workouts are available yet.</p>}</div></section>
}