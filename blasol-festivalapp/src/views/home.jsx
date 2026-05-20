import '../css/home.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import headerShape from '../assets/header.png'
import heroImg from '../assets/HeroImagehomepage.png'
import friend1 from '../assets/friend1.png'
import friend2 from '../assets/friend2.png'
import friend3 from '../assets/friend3.png'
import friend4 from '../assets/friend4.png'
import summertimeSadnessBtn from '../assets/Summertime_Sadness.png'
import ticketImg from '../assets/Ticket.png'
import SAVEUS from '../assets/SAVEUS.png'
import GALOPDERBY from '../assets/GALOPDERBY.png'
import NATURALBORNHIPPIES from '../assets/NATURALBORNHIPPIES.png'


import ArtistOverlay from '../components/ArtistOverlay'
import artistProfiles from '../components/artistProfiles'
import lineupData from '../components/lineupData'

function Home() {
  const navigate = useNavigate()
  const friends = [friend1, friend2, friend3, friend4]
  const [selectedArtist, setSelectedArtist] = useState(null)

  const handleSeeMapClick = () => {
    navigate('/map')
  }

  const handleSeeLineupClick = () => {
    navigate('/lineup')
  }

  const galopArtist = lineupData.find((a) => a.name === 'GALOP-DERBY')
  const hippiesArtist = lineupData.find((a) => a.name === 'NATURAL BORN HIPPIES')

  return (
    <div className="home-page">
      <header className="home-header">
        <img src={headerShape} alt="Home header" className="home-header-image" />
        <h1 className="home-page-title">Home</h1>
      </header>

      <section className="home-top">
        <img src={heroImg} alt="Festival crowd" className="home-top-hero" />
      </section>

      <ArtistOverlay
        artist={selectedArtist}
        image={selectedArtist ? artistProfiles[selectedArtist.name] : null}
        onClose={() => setSelectedArtist(null)}
      />

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
            onClick={handleSeeMapClick}
          >
            <img src={summertimeSadnessBtn} alt="map button" />
            <span className="see-map-text">see map</span>
          </button>
        </div>
      </section>

      <section className="ticket-section">
        <h2 className="home-ticket-title">YOUR TICKET</h2>
        <div className="ticket-wrapper">
          <img src={ticketImg} alt="Festival ticket" className="ticket-image" />
        </div>
      </section>

      <section className="live-now-section">
        <h2 className="home-live-title">LIVE NOW</h2>
        <div className="live-now-wrapper">
          <img src={SAVEUS} alt="Live now" className="live-now-image" />
          <button
            className="see-lineup-button"
            type="button"
            onClick={handleSeeLineupClick}
          >
            <img src={summertimeSadnessBtn} alt="lineup button" />
            <span className="see-map-text">see lineup</span>
          </button>
        </div>
      </section>

      <section className="whats-next-section">
        <h2 className="home-live-title whats-next-title">WHAT'S NEXT</h2>
        <div className="whats-next-wrapper">
          <div className="whats-next-item whats-next-item-right">
            <div
              role="button"
              tabIndex={0}
              className="whats-next-image-button"
              onClick={() => galopArtist && setSelectedArtist(galopArtist)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  galopArtist && setSelectedArtist(galopArtist)
                }
              }}
              aria-label="Open Galop Derby profile"
            >
              <img className="galop-derby whats-next-right" src={GALOPDERBY} alt="galopderby" style={{width: '260px', height: '80px'}} />

              {/* stars removed - image only */}
            </div>
          </div>

          <div className="whats-next-item whats-next-item-left">
            <div
              role="button"
              tabIndex={0}
              className="whats-next-image-button"
              onClick={() => hippiesArtist && setSelectedArtist(hippiesArtist)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  hippiesArtist && setSelectedArtist(hippiesArtist)
                }
              }}
              aria-label="Open Natural Born Hippies profile"
            >
              <img className="natural-born-hippies whats-next-left" src={NATURALBORNHIPPIES} alt="naturalbornhippies" style={{width: '260px', height: '80px'}} />

              {/* stars removed - image only */}
            </div>
          </div>
        </div>
      </section>






    </div>


  )
}

export default Home