import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import './css/App.css'
import Home from './views/home.jsx'
import Lineup from './views/lineup.jsx'
import Map from './views/map.jsx'
import MapBigger from './views/map_bigger.jsx'
import Friends from './views/friends.jsx'
import Profile from './views/profile.jsx'
import MySchedule from './views/myschedule.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/map_bigger" element={<MapBigger />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/lineup" element={<Lineup />} />
            <Route path="/myschedule" element={<MySchedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </BrowserRouter>
  )
}

export default App