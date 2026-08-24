import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([]); const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { Promise.all([fetchResource('activities'), fetchResource('users')]).then(([items, people]) => { setActivities(items); setUsers(people) }).catch((reason) => setError(reason.message)) }, [])
  const names = Object.fromEntries(users.map((user) => [String(user._id || user.id), user.name]))
  return <ResourcePage title="Activity feed" kicker="TRAINING LOG" error={error}>{activities.length ? <div className="data-list">{activities.map((activity) => <article className="list-row" key={activity._id || activity.id}><div><strong>{activity.type}</strong><span>{names[String(activity.userId)] || 'OctoFit member'} · {activity.duration} min</span></div><b>{activity.points} pts</b></article>)}</div> : <EmptyState />}</ResourcePage>
}
function ResourcePage({ title, kicker, error, children }) { return <section><p className="eyebrow">{kicker}</p><h1 className="page-title">{title}</h1>{error ? <p className="alert alert-warning">{error}</p> : children}</section> }
function EmptyState() { return <p className="empty-state">No records yet. Your next entry can start the streak.</p> }