import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/profile.css'

import profileTop from '../assets/header.png'
import profileHero from '../assets/BACKGROUNDRECTANGLEPROFILEPAGE.png'
import profilePic from '../assets/PROFILEPICTURE.png'
import divider from '../assets/Horizontal rectangle.png'
import ticketImg from '../assets/Ticket.png'

function Profile() {
  const navigate = useNavigate()
  const [showTicket, setShowTicket] = useState(false)

  const goToWebsite = () => {
    window.open('https://blaasol.dk/', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="profile-page">
      <div className="profile-top">
        <img src={profileTop} alt="" className="profile-top-shape" />

        <h1 className="profile-page-title">Profile</h1>

        <div className="profile-hero-wrap">
          <img src={profileHero} alt="" className="profile-top-hero" />

          <div className="profile-card-content">
            <div className="profile-picture-wrap">
              <img src={profilePic} alt="Profile" className="profile-picture" />
              <button className="profile-update-button" type="button">
                Update
              </button>
            </div>

            <div className="profile-user-info">
              <h2 className="profile-user-name">Sarah Festie</h2>
              <p className="profile-user-role">Festival Attendee</p>
              <p className="profile-user-code">Code: 1234-ABCD</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-divider-wrap">
        <img src={divider} alt="" className="profile-divider-image" />
      </div>

      <div className="profile-ticket-section">
        <h3 className="profile-section-title">Your Ticket</h3>
        <button
          type="button"
          className="profile-ticket-button"
          onClick={() => setShowTicket(true)}
        >
          <img src={ticketImg} alt="Your ticket" className="profile-ticket-image" />
        </button>
      </div>

      <div className="profile-more-section">
        <h4 className="profile-more-title">More</h4>

        <div className="profile-more-list">
          <button
            className="profile-more-item"
            type="button"
            onClick={() => navigate('/myschedule')}
          >
            Scheduled Events
          </button>

          <button
            className="profile-more-item"
            type="button"
            onClick={() => navigate('/')}
          >
            Friends List
          </button>

          <button
            className="profile-more-item"
            type="button"
          >
            Settings
          </button>

          <button
            className="profile-more-item"
            type="button"
            onClick={goToWebsite}
          >
            BLÅ SOL Website
          </button>
        </div>
      </div>

      {showTicket && (
        <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
          <div className="ticket-overlay-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="ticket-overlay-close"
              type="button"
              onClick={() => setShowTicket(false)}
            >
              ×
            </button>
            <img src={ticketImg} alt="Ticket" className="ticket-overlay-image" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile