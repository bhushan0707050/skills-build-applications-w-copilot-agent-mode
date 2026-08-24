import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand"><img src={logo} alt="" /> OctoFit <span>TRACKER</span></NavLink>
        <nav aria-label="Primary navigation">
          <NavItem to="/activities" label="Activities" /><NavItem to="/leaderboard" label="Leaderboard" /><NavItem to="/teams" label="Teams" /><NavItem to="/users" label="Users" /><NavItem to="/workouts" label="Workouts" />
        </nav>
      </header>
      <main className="content"><Routes><Route path="/" element={<Home />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
    </div>
  )
}

function NavItem({ to, label }) { return <NavLink to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink> }
function Home() { return <section className="welcome"><p className="eyebrow">MERGINGTON HIGH SCHOOL</p><h1>Move with purpose.</h1><p>Track the work, find your people, and keep your momentum visible.</p><NavLink to="/activities" className="primary-button">View activity feed</NavLink></section> }

export default App
