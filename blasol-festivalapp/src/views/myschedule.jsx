import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/myschedule.css'

import starFrame from '../assets/Starframe.png'
import addButton from '../assets/ADDBUTTON.png'
import myScheduleTopShape from '../assets/MyScheduleTopShape.png'
import lineupTopShape from '../assets/LineupTopShape.png'
import sunLogo from '../assets/Sunlogo.png'
import blaSolLogo from '../assets/BlaSollogo.png'

import ArtistOverlay from '../components/ArtistOverlay'
import artistProfiles from '../components/artistProfiles'
import { getSavedSchedule, toggleScheduleItem } from '../components/scheduleStorage'

function MySchedule() {
  const navigate = useNavigate()
  const [savedItems, setSavedItems] = useState([])
  const [search, setSearch] = useState('')
  const [selectedArtist, setSelectedArtist] = useState(null)

  useEffect(() => {
    setSavedItems(getSavedSchedule())
  }, [])

  const handleRemove = (artist) => {
    const updated = toggleScheduleItem(artist)
    setSavedItems(updated)
  }

  const filteredItems = useMemo(() => {
    return savedItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [savedItems, search])

  return (
    <div className="myschedule-page">
      <div className="myschedule-top">
        <div className="myschedule-statusbar">
          <span>14:23</span>
          <div className="myschedule-status-icons">⌶ 𐄁 ▱</div>
        </div>

        <div className="myschedule-header">
          <div className="myschedule-brand-wrap">
            <img src={sunLogo} alt="" className="myschedule-sun-logo" />
            <img
              src={blaSolLogo}
              alt="BLÅ SOL"
              className="myschedule-brand-logo"
            />
          </div>

          <h1 className="myschedule-title">
            MY
            <br />
            SCHEDULE
          </h1>
        </div>

        <div className="myschedule-tabs">
          <div className="myschedule-tab-shape-wrap myschedule-tab-shape-left">
            <img
              src={lineupTopShape}
              alt=""
              className="myschedule-tab-shape"
            />
            <button
              className="myschedule-tab-button"
              type="button"
              onClick={() => navigate('/lineup')}
            >
              Lineup
            </button>
          </div>

          <div className="myschedule-tab-shape-wrap myschedule-tab-shape-right">
            <img
              src={myScheduleTopShape}
              alt=""
              className="myschedule-tab-shape"
            />
            <button
              className="myschedule-tab-button myschedule-tab-button-active"
              type="button"
            >
              My Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="myschedule-content">
        <div className="myschedule-search-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="myschedule-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" type="button" aria-label="Search">
            ⌕
          </button>
        </div>

        <div className="myschedule-list">
          {filteredItems.map((artist) => (
            <div className="myschedule-card-row" key={artist.id}>
              <button
                type="button"
                className="myschedule-card-button"
                onClick={() => setSelectedArtist(artist)}
                aria-label={`Open ${artist.name} profile`}
              >
                {artist.image ? (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="myschedule-card-image"
                  />
                ) : (
                  <div className="myschedule-card-fallback">
                    <div className="myschedule-card-text">
                      <h3>{artist.name}</h3>
                      <p>{artist.time || ''}</p>
                    </div>
                  </div>
                )}
              </button>

              <button
                className="myschedule-star-button"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(artist)
                }}
                aria-label={`Unsave ${artist.name}`}
              >
                <img src={starFrame} alt="" className="myschedule-star-icon" />
              </button>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="myschedule-empty">
              {search ? 'No artists match your search.' : 'No saved artists yet.'}
            </div>
          )}
        </div>

        <div className="myschedule-add-wrap">
          <button
            type="button"
            className="myschedule-add-image-button"
            onClick={() => navigate('/lineup')}
            aria-label="Go to lineup"
          >
            <img src={addButton} alt="" className="myschedule-add-image" />
          </button>
        </div>
      </div>

      <ArtistOverlay
        artist={selectedArtist}
        image={selectedArtist ? artistProfiles[selectedArtist.name] : null}
        onClose={() => setSelectedArtist(null)}
      />
    </div>
  )
}

export default MySchedule