import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchResource('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section><p className="eyebrow">PERSONALIZED SUGGESTIONS</p><h1 className="page-title">Workouts</h1>{error && <p className="alert alert-warning">{error}</p>}<div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id || workout.id}><div className="workout-meta"><span>{workout.difficulty}</span><span>{workout.duration} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p></article>)}{!workouts.length && !error && <p className="empty-state">No workouts are available yet.</p>}</div></section>
}