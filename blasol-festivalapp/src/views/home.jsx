import '../css/home.css'

import headerShape from '../assets/header.png'
import heroImg from '../assets/HeroImagehomepage.png'
import friend1 from '../assets/friend1.png'
import friend2 from '../assets/friend2.png'
import friend3 from '../assets/friend3.png'
import friend4 from '../assets/friend4.png'
import seeMapBtn from '../assets/friendview-button.png'
import ticketImg from '../assets/Ticket.png'

function Home() {
  const friends = [
    { name: 'Neyu', image: friend1 },
    { name: 'Iman', image: friend2 },
    { name: 'Rono', image: friend3 },
    { name: 'Anna', image: friend4 },
  ]

  return (
    <div className="home-page">
      <section className="home-top">
        <img src={headerShape} alt="Header shape" className="home-top-shape" />
        <img src={heroImg} alt="Festival crowd" className="home-top-hero" />
      </section>

      <section className="home-section friends-nearby-section">
        <h2 className="section-title">FRIENDS NEARBY</h2>

        <div className="friends-row">
          {friends.map((friend) => (
            <div className="friend-card" key={friend.name}>
              <img src={friend.image} alt={friend.name} className="friend-avatar" />
              <span className="friend-name">{friend.name}</span>
            </div>
          ))}

          <button className="see-map-button" type="button">
            <img src={seeMapBtn} alt="See map" />
          </button>
        </div>
      </section>

      <section className="home-section ticket-section">
        <h2 className="section-title">YOUR TICKET</h2>
        <div className="ticket-wrapper">
          <img src={ticketImg} alt="Festival ticket" className="ticket-image" />
        </div>
      </section>

      <section className="home-section live-now-section">
        <h2 className="section-title">LIVE NOW</h2>
      </section>
    </div>
  )
}

export default Home