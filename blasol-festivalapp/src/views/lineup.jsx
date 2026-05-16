import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/lineup.css'

import mainRectangle from '../assets/Mainrectangle.png'
import timelineBar from '../assets/Timelinebar.png'
import verticalRectangle from '../assets/VerticalRectangle1.png'
import horizontalRectangle from '../assets/Horizontal rectangle.png'
import starFrame from '../assets/Starframe.png'

import lineupData, { stages, timeLabels } from '../components/lineupData'
import { getSavedSchedule, toggleScheduleItem } from '../components/scheduleStorage'

const TIMELINE_WIDTH = 2416
const TIMELINE_HEIGHT = 676
const TOPBAR_HEIGHT = 25
const LEFT_RAIL_WIDTH = 33
const ROW_HEIGHT = 145
const GRID_HEIGHT = 580
const HOUR_WIDTH = 120

function Lineup() {
  const navigate = useNavigate()
  const [savedItems, setSavedItems] = useState([])

  useEffect(() => {
    setSavedItems(getSavedSchedule())
  }, [])

  const handleToggle = (artist) => {
    const updated = toggleScheduleItem(artist)
    setSavedItems(updated)
  }

  const isSaved = (artist) =>
    savedItems.some((item) => item.id === artist.id)

  return (
    <div className="lineup-page">
      <div className="lineup-header">
        <div className="lineup-brand">BLÅ SOL</div>
        <h1 className="lineup-title">LINEUP</h1>
      </div>

      <div className="lineup-tabs">
        <button className="lineup-tab active" type="button">
          Lineup
        </button>
        <button
          className="lineup-tab"
          type="button"
          onClick={() => navigate('/myschedule')}
        >
          My Schedule
        </button>
      </div>

      <div className="timeline-shell">
        <div className="timeline-scroll">
          <div
            className="timeline-board"
            style={{
              width: `${TIMELINE_WIDTH}px`,
              height: `${TIMELINE_HEIGHT}px`,
            }}
          >
            <img src={mainRectangle} alt="" className="timeline-main-bg" />

            <div
              className="timeline-topbar"
              style={{ height: `${TOPBAR_HEIGHT}px` }}
            >
              <img src={timelineBar} alt="" className="timeline-topbar-bg" />

              <div className="timeline-times">
                {timeLabels.map((time, index) => (
                  <div
                    key={time}
                    className="timeline-time"
                    style={{
                      left: `${LEFT_RAIL_WIDTH + index * HOUR_WIDTH}px`,
                      width: `${HOUR_WIDTH}px`,
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="timeline-body"
              style={{ top: `${TOPBAR_HEIGHT}px` }}
            >
              <div
                className="timeline-stage-column"
                style={{
                  width: `${LEFT_RAIL_WIDTH}px`,
                  height: `${GRID_HEIGHT}px`,
                }}
              >
                {stages.map((stage, index) => (
                  <div
                    key={stage}
                    className="timeline-stage-block"
                    style={{
                      top: `${index * ROW_HEIGHT}px`,
                      width: `${LEFT_RAIL_WIDTH}px`,
                      height: `${ROW_HEIGHT}px`,
                    }}
                  >
                    <img
                      src={verticalRectangle}
                      alt=""
                      className="timeline-stage-block-bg"
                    />
                    <div className="timeline-stage-name">{stage}</div>
                  </div>
                ))}
              </div>

              <div
                className="timeline-grid"
                style={{
                  left: `${LEFT_RAIL_WIDTH}px`,
                  width: `${TIMELINE_WIDTH - LEFT_RAIL_WIDTH}px`,
                  height: `${GRID_HEIGHT}px`,
                }}
              >
                {stages.map((stage, index) => (
                  <div
                    key={stage}
                    className="timeline-row-bg"
                    style={{
                      top: `${index * ROW_HEIGHT}px`,
                      height: `${ROW_HEIGHT}px`,
                    }}
                  >
                    <img
                      src={horizontalRectangle}
                      alt=""
                      className="timeline-row-bg-image"
                    />
                  </div>
                ))}

                {timeLabels.map((_, index) => (
                  <div
                    key={index}
                    className="timeline-column-line"
                    style={{ left: `${index * HOUR_WIDTH}px` }}
                  />
                ))}

                {lineupData.map((artist) => (
                  <div key={artist.id}>
                    <button
                      type="button"
                      className="artist-card-button"
                      style={{
                        left: `${artist.cardLeft}px`,
                        top: `${artist.cardTop}px`,
                        width: `${artist.cardWidth}px`,
                        height: `${artist.cardHeight}px`,
                      }}
                      onClick={() => handleToggle(artist)}
                      aria-label={`Toggle ${artist.name}`}
                    >
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="artist-card-image"
                      />
                    </button>

                    {artist.starSize > 0 && (
                      <>
                        {isSaved(artist) && (
                          <img
                            src={starFrame}
                            alt=""
                            className="artist-star-selected"
                            style={{
                              left: `${artist.starLeft}px`,
                              top: `${artist.starTop}px`,
                              width: `${artist.starSize}px`,
                              height: `${artist.starSize}px`,
                            }}
                          />
                        )}

                        <button
                          type="button"
                          className="artist-star-hitbox"
                          style={{
                            left: `${artist.starLeft}px`,
                            top: `${artist.starTop}px`,
                            width: `${artist.starSize}px`,
                            height: `${artist.starSize}px`,
                          }}
                          onClick={() => handleToggle(artist)}
                          aria-label={`Save ${artist.name}`}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lineup