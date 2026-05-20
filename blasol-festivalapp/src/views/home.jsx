import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/home.css'

import headerShape from '../assets/header.png'
import heroImg from '../assets/HeroImagehomepage.png'
import friend1 from '../assets/friend1.png'
import friend2 from '../assets/friend2.png'
import friend3 from '../assets/friend3.png'
import friend4 from '../assets/friend4.png'
import summertimeSadnessBtn from '../assets/Summertime_Sadness.png'
import ticketImg from '../assets/Ticket.png'
import saveusProfileImg from '../assets/SAVEUSProfile.png'

function Home() {
  const [showTicketOverlay, setShowTicketOverlay] = useState(false)
  const navigate = useNavigate()
  const friends = [friend1, friend2, friend3, friend4]

  return (
    <>
      <div className="home-page">
        <header className="home-header">
          <img src={headerShape} alt="Home header" className="home-header-image" />
          <h1 className="home-page-title">Home</h1>
        </header>

        <section className="home-top">
          <img src={heroImg} alt="Festival crowd" className="home-top-hero" />
        </section>

        <section className="friends-nearby-section">
          <h2 className="home-friends-title">FRIENDS NEARBY</h2>

          <div className="friends-row">
            {friends.map((friend, index) => (
              <div className="friend-card" key={friend}>
                <img src={friend} alt={`Friend ${index + 1}`} className="friend-avatar" />
              </div>
            ))}

            <button
              className="see-map-button"
              type="button"
              onClick={() => navigate('/map')}
            >
              <img src={summertimeSadnessBtn} alt="" />
              <span className="see-map-text">see map {'\u2192'}</span>
            </button>
          </div>
        </section>

        <section className="ticket-section">
          <h2 className="home-ticket-title">YOUR TICKET</h2>

          <button
            type="button"
            className="home-ticket-button"
            onClick={() => setShowTicketOverlay(true)}
          >
            <div className="ticket-wrapper">
              <img src={ticketImg} alt="Festival ticket" className="ticket-image" />
            </div>
          </button>
        </section>

        <section className="live-now-section">
          <h2 className="home-live-title">LIVE NOW</h2>

          <div className="live-now-card">
            <img
              src={saveusProfileImg}
              alt="Saveus profile"
              className="live-now-image"
            />
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
              src={ticketImg}
              alt="Expanded festival ticket"
              className="ticket-overlay-image"
               
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Home