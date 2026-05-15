import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import './css/App.css'
import Home from './views/home.jsx'
import Lineup from './views/lineup.jsx'
import Map from './views/map.jsx'
import Profile from './views/profile.jsx'


function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/lineup" element={<Lineup />} />
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
