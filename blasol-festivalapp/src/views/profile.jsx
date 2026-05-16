import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/profile.css'

import headerShape from '../assets/header.png'
import backgroundRectangleProfilePage from '../assets/BACKGROUNDRECTANGLEPROFILEPAGE.png'
import profilePicture from '../assets/PROFILEPICTURE.png'
import curvedLineProfilePage from '../assets/CURVEDLINEPROFILEPAGE.png'
import ticketImage from '../assets/Ticket.png'

function Profile() {
  const [showTicketOverlay, setShowTicketOverlay] = useState(false)
  const navigate = useNavigate()

  const openBlaSolWebsite = () => {
    window.open('https://blaasol.dk/', '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div className="profile-page">
        <div className="profile-top">
          <div className="profile-statusbar">
            <span>14:23</span>
            <div className="profile-status-icons">▮▮▮ ⌶ ▱</div>
          </div>

          <img src={headerShape} alt="" className="profile-top-shape" />

          <div className="profile-hero-wrap">
            <img
              src={backgroundRectangleProfilePage}
              alt=""
              className="profile-top-hero"
            />

            <div className="profile-card-content">
              <div className="profile-picture-wrap">
                <img
                  src={profilePicture}
                  alt="Sarah Festie"
                  className="profile-picture"
                />

                <button type="button" className="profile-update-button">
                  Update Photo(s)
                </button>
              </div>

              <div className="profile-user-info">
                <h2 className="profile-user-name">Sarah Festie</h2>
                <p className="profile-user-role">VIP Ticket holder</p>
                <p className="profile-user-code">Friend code : SF2406BS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-divider-wrap">
          <img
            src={curvedLineProfilePage}
            alt=""
            className="profile-divider-image"
          />
        </div>

        <section className="profile-ticket-section">
          <h2 className="profile-section-title">My ticket</h2>

          <button
            type="button"
            className="profile-ticket-button"
            onClick={() => setShowTicketOverlay(true)}
          >
            <img
              src={ticketImage}
              alt="Festival ticket"
              className="profile-ticket-image"
            />
          </button>
        </section>

        <section className="profile-more-section">
          <h2 className="profile-more-title">More</h2>

          <div className="profile-more-list">
            <button
              type="button"
              className="profile-more-item"
              onClick={() => navigate('/myschedule')}
            >
              Scheduled Events
            </button>

            <button
              type="button"
              className="profile-more-item"
            >
              Friends List
            </button>

            <button
              type="button"
              className="profile-more-item"
            >
              Settings
            </button>

            <button
              type="button"
              className="profile-more-item"
              onClick={openBlaSolWebsite}
            >
              BLÅ SOL Website
            </button>
          </div>
        </section>
      </div>

      {showTicketOverlay && (
        <div
          className="ticket-overlay"
          onClick={() => setShowTicketOverlay(false)}
        >
          <div
            className="ticket-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ticket-overlay-close"
              onClick={() => setShowTicketOverlay(false)}
            >
              ×
            </button>

            <img
              src={ticketImage}
              alt="Expanded festival ticket"
              className="ticket-overlay-image"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Profile