import '../css/home.css'

import headerShape from '../assets/header.png'
import heroImg from '../assets/HeroImagehomepage.png'
import friend1 from '../assets/friend1.png'
import friend2 from '../assets/friend2.png'
import friend3 from '../assets/friend3.png'
import friend4 from '../assets/friend4.png'
import summertimeSadnessBtn from '../assets/Summertime_Sadness.png'
import ticketImg from '../assets/Ticket.png'

function Home() {
  const friends = [friend1, friend2, friend3, friend4]

  return (
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

          <button className="see-map-button" type="button">
            <img src={summertimeSadnessBtn} alt="" />
            <span className="see-map-text">see map {'\u2192'}</span>
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
      </section>
    </div>
  )
}

export default Home