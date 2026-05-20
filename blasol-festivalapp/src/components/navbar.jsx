import { NavLink, useNavigate } from 'react-router-dom'
import homeIcon from '../assets/home-icon.svg'
import mapIcon from '../assets/map-icon.svg'
import lineupIcon from '../assets/lineup-icon.svg'
import profileIcon from '../assets/profile-icon.svg'

// This is the background SVG shape used when the Home nav link is active.
function HomeOverlay() {
  return (
    <svg
      className="navbar-overlay navbar-overlay-home"
      xmlns="http://www.w3.org/2000/svg"
      width="112"
      height="88"
      viewBox="0 0 112 88"
      fill="none"
    >
      <path
        d="M97.5026 59.0685L108.376 88L66.6954 88L14.1422 88L0 88L1.83588e-06 67L-4.26362e-06 49.5L-1.99062e-06 23.5L6.38111e-08 -2.50501e-05L34.0762 -2.97005e-05L100.248 -2.39156e-05L100.248 19.2876L112 28.3287L97.5026 59.0685Z"
        fill="#89A7B2"
      />
    </svg>
  )
}

// This background SVG shape is shared by the Map and Lineup nav links.
function MiddleOverlay() {
  return (
    <svg
      className="navbar-overlay navbar-overlay-middle"
      xmlns="http://www.w3.org/2000/svg"
      width="119"
      height="88"
      viewBox="0 0 119 88"
      fill="none"
    >
      <path
        d="M104.503 59.0685L115.376 88L73.6954 88L21.1422 88L12.0812 88L-5.62705e-06 65.0959L14.4975 48.8219L5.43657 23.5068L16.9137 6.33412e-06L41.0762 8.17075e-07L107.248 6.60199e-06L107.248 19.2877L119 28.3288L104.503 59.0685Z"
        fill="#89A7B2"
      />
    </svg>
  )
}

// This is the background SVG shape used when the Profile nav link is active.
function ProfileOverlay() {
  return (
    <svg
      className="navbar-overlay navbar-overlay-profile"
      xmlns="http://www.w3.org/2000/svg"
      width="115"
      height="88"
      viewBox="0 0 115 88"
      fill="none"
    >
      <path
        d="M114.5 60.5L114.5 88L73.6954 88L21.1422 88L12.0812 88L2.00234e-06 65.0959L14.4975 48.8219L5.43657 23.5068L16.9137 6.72752e-06L41.0762 1.21048e-06L114.5 7.62939e-06L114.5 16.5L114.5 28.5L114.5 60.5Z"
        fill="#89A7B2"
      />
    </svg>
  )
}

// This component keeps the repeated nav item layout in one place.
// The Overlay prop lets each link pass in a different SVG background.
function NavItemContent({ icon, label, isActive, Overlay }) {
  return (
    <>
      {/* Only render the SVG background for the currently active route. */}
      {isActive && <Overlay />}
      <img className="nav-icon" src={icon} alt="" aria-hidden="true" />
      <span className="nav-label">{label}</span>
    </>
  )
}

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="app-navbar" aria-label="Main navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        {/* NavLink gives us isActive so this link knows when it is selected. */}
        {({ isActive }) => (
          <NavItemContent
            icon={homeIcon}
            label="Home"
            isActive={isActive}
            Overlay={HomeOverlay}
          />
        )}
      </NavLink>
      <NavLink
        to="/map"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        {/* Map uses the wider middle SVG shape. */}
        {({ isActive }) => (
          <NavItemContent
            icon={mapIcon}
            label="Map"
            isActive={isActive}
            Overlay={MiddleOverlay}
          />
        )}
      </NavLink>
      <NavLink
        to="/lineup"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        {/* Lineup uses the same wider middle SVG shape as Map. */}
        {({ isActive }) => (
          <NavItemContent
            icon={lineupIcon}
            label="Lineup"
            isActive={isActive}
            Overlay={MiddleOverlay}
          />
        )}
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
        onClick={() => navigate('/profile')}
      >
        {/* Profile uses its own SVG shape so it fits the right edge of the navbar. */}
        {({ isActive }) => (
          <NavItemContent
            icon={profileIcon}
            label="Profile"
            isActive={isActive}
            Overlay={ProfileOverlay}
          />
        )}
      </NavLink>
    </nav>
  )
}

export default Navbar