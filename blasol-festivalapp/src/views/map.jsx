import legendImage from '../assets/legend.png'
import headerImage from '../assets/header.png'
import friendsBg from '../assets/friendsbg.png'
import youImage from '../assets/you-friends.png'
import friend1 from '../assets/friend1.png'
import friend2 from '../assets/friend2.png'
import friend3 from '../assets/friend3.png'
import friend4 from '../assets/friend4.png'
import addFriendImage from '../assets/addfriend.png'
import friendViewButton from '../assets/friendview-button.png'
import expandButton from '../assets/expand-button.png'
import '../css/map.css'

const friendCards = [
  { name: 'Friend 1', image: friend1 },
  { name: 'Friend 2', image: friend2 },
  { name: 'Friend 3', image: friend3 },
  { name: 'Friend 4', image: friend4 },
]

function Map() {
  return (
    <section className="map-page">
      <header className="map-header">
        <img className="map-header-image" src={headerImage} alt="Map header" />
        <h1 className="page-title">Map</h1>
      </header>

      <section className="map-friends-panel" aria-label="Friends on map">
        <img className="map-friends-bg" src={friendsBg} alt="Friends area background" />
        <h2 className="friends-title">Friends</h2>
        <div className="map-friends-row">
          <img className="map-friend-image" src={youImage} alt="You" />
          {friendCards.map((friend) => (
            <img className="map-friend-image" src={friend.image} alt={friend.name} key={friend.name} />
          ))}
          <img className="map-friend-image" src={addFriendImage} alt="Add friend" />
        </div>
      </section>

      <div className="map-buttons" aria-label="Map buttons">
        <img className="map-button-expand" src={expandButton} alt="Expand" />
        <img className="map-button-friendview" src={friendViewButton} alt="Friend view" />
      </div>

      <div className="map-legend-wrap">
        <img className="map-legend" src={legendImage} alt="Map legend" />
        <h2 className="legend-title">Legend</h2>
        <div className="legend-labels">
          <p className="legend-label wc">WC</p>
          <p className="legend-label food">Food</p>
          <p className="legend-label merch">Merch</p>
          <p className="legend-label benches">Benches</p>
          <p className="legend-label water-refill">Water Refill Station</p>
          <p className="legend-label first-aid">First Aid</p>
          <p className="legend-label drinks">Drinks</p>
          <p className="legend-label festival-info">Festival Information</p>
        </div>
      </div>
    </section>
  )
}

export default Map
