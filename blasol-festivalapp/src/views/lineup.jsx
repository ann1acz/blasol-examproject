import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/lineup.css'

import mainRectangle from '../assets/Mainrectangle.png'
import timelineBar from '../assets/Timelinebar.png'
import verticalRectangle from '../assets/VerticalRectangle1.png'
import horizontalRectangle from '../assets/Horizontal rectangle.png'
import starIcon from '../assets/star.svg'
import sunLogo from '../assets/Sunlogo.png'
import blaSolLogo from '../assets/BlaSollogo.png'
import lineupTopShape from '../assets/LineupTopShape.png'
import myScheduleTopShape from '../assets/MyScheduleTopShape.png'

import ArtistOverlay from '../components/ArtistOverlay'
import artistProfiles from '../components/artistProfiles'
import lineupData, { stages, timeLabels } from '../components/lineupData'
import { getSavedSchedule, toggleScheduleItem } from '../components/scheduleStorage'

const TIMELINE_WIDTH = 2416
const TOPBAR_HEIGHT = 25
const LEFT_RAIL_WIDTH = 33
const GRID_HEIGHT = 580
const TIMELINE_HEIGHT = TOPBAR_HEIGHT + GRID_HEIGHT
const HOUR_WIDTH = (TIMELINE_WIDTH - LEFT_RAIL_WIDTH) / timeLabels.length
const STAGE_HEIGHT_PERCENT = 100 / stages.length
const TIMELINE_START_HOUR = 11
const STAR_RIGHT_OFFSET = 78
const STAR_SCALE = 1.18
const artistTimes = {
  1: ['11:45', '13:30'],
  2: ['13:45', '15:30'],
  3: ['16:45', '19:00'],
  4: ['19:25', '21:50'],
  5: ['22:15', '00:15'],
  6: ['12:45', '14:00'],
  7: ['15:20', '17:00'],
  8: ['18:00', '20:10'],
  9: ['21:00', '23:00'],
  10: ['23:30', '01:30'],
  11: ['12:50', '14:00'],
  12: ['15:10', '16:00'],
  13: ['18:00', '19:50'],
  14: ['20:50', '22:30'],
  15: ['23:40', '01:50'],
  16: ['14:00', '15:00'],
  17: ['15:15', '16:10'],
  18: ['16:20', '17:30'],
  19: ['18:30', '20:00'],
  20: ['20:15', '21:40'],
  21: ['22:00', '00:00'],
}
const toGridPercent = (value) => `${(value / GRID_HEIGHT) * 100}%`
const getArtistTimes = (artist) => artistTimes[artist.id]
const timeToHours = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  const normalizedHours = hours < TIMELINE_START_HOUR ? hours + 24 : hours
  return normalizedHours + minutes / 60
}
const getTimeLeft = (time) => (timeToHours(time) - TIMELINE_START_HOUR) * HOUR_WIDTH
const getCardLeft = (artist) => {
  const times = getArtistTimes(artist)
  return times ? getTimeLeft(times[0]) : artist.cardLeft
}
const getCardWidth = (artist) => {
  const times = getArtistTimes(artist)
  if (!times) {
    return artist.cardWidth
  }

  return artist.cardWidth
}
const getStarLeft = (artist) => getCardLeft(artist) + getCardWidth(artist) - STAR_RIGHT_OFFSET
const getStageIndex = (top) =>
  Math.min(stages.length - 1, Math.floor(top / (GRID_HEIGHT / stages.length)))
const getCenteredCardTop = (artist) =>
  `${getStageIndex(artist.cardTop) * STAGE_HEIGHT_PERCENT + (STAGE_HEIGHT_PERCENT - (artist.cardHeight / GRID_HEIGHT) * 100) / 2}%`
const getCenteredStarTop = (artist) =>
  `${getStageIndex(artist.cardTop) * STAGE_HEIGHT_PERCENT + (STAGE_HEIGHT_PERCENT - (artist.starSize / GRID_HEIGHT) * 100) / 2}%`
const getStarTop = (artist) =>
  `calc(${getCenteredStarTop(artist)} + ${artist.starOffsetY ?? 0}px)`
const getAdjustedStarLeft = (artist) =>
  getStarLeft(artist) + (artist.starOffsetX ?? 0)
const getStarSize = (artist) => artist.starSize * STAR_SCALE

function Lineup() {
  const navigate = useNavigate()
  const [savedItems, setSavedItems] = useState([])
  const [selectedArtist, setSelectedArtist] = useState(null)

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
      <div className="lineup-top">
        <div className="lineup-header">
          <div className="lineup-brand-wrap">
            <img src={sunLogo} alt="" className="lineup-sun-logo" />
            <img src={blaSolLogo} alt="BLÅ SOL" className="lineup-brand-logo" />
          </div>

          <h1 className="lineup-title">LINEUP</h1>
        </div>

        <div className="lineup-tabs">
          <div className="lineup-tab-shape-wrap lineup-tab-shape-left">
            <img
              src={lineupTopShape}
              alt=""
              className="lineup-tab-shape"
            />
            <button
              className="lineup-tab-button lineup-tab-button-active"
              type="button"
            >
              Lineup
            </button>
          </div>

          <div className="lineup-tab-shape-wrap lineup-tab-shape-right">
            <img
              src={myScheduleTopShape}
              alt=""
              className="lineup-tab-shape"
            />
            <button
              className="lineup-tab-button"
              type="button"
              onClick={() => navigate('/myschedule')}
            >
              My Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="lineup-content">
        <div className="timeline-shell">
          <div className="timeline-scroll">
            <div
              className="timeline-board"
              style={{
                width: `${TIMELINE_WIDTH}px`,
                minWidth: `${TIMELINE_WIDTH}px`,
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
                    height: '100%',
                  }}
                >
                  {stages.map((stage, index) => (
                    <div
                      key={stage}
                      className="timeline-stage-block"
                      style={{
                        top: `${index * STAGE_HEIGHT_PERCENT}%`,
                        width: `${LEFT_RAIL_WIDTH}px`,
                        height: `${STAGE_HEIGHT_PERCENT}%`,
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
                    height: '100%',
                  }}
                >
                  {stages.map((stage, index) => (
                    <div
                      key={stage}
                      className="timeline-row-bg"
                      style={{
                        top: `${index * STAGE_HEIGHT_PERCENT}%`,
                        height: `${STAGE_HEIGHT_PERCENT}%`,
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
                          left: `${getCardLeft(artist)}px`,
                          top: getCenteredCardTop(artist),
                          width: `${getCardWidth(artist)}px`,
                          height: `${artist.cardHeight}px`,
                        }}
                        onClick={() => setSelectedArtist(artist)}
                        aria-label={`Open ${artist.name} profile`}
                      >
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="artist-card-image"
                        />
                      </button>

                      {artist.starSize > 0 && (
                        <>
                          {isSaved(artist) ? (
                            <span
                              aria-hidden="true"
                              className="artist-star-selected"
                              style={{
                                left: `${getAdjustedStarLeft(artist)}px`,
                                top: getStarTop(artist),
                                width: `${getStarSize(artist)}px`,
                                height: `${getStarSize(artist)}px`,
                                '--star-icon': `url(${starIcon})`,
                              }}
                            />
                          ) : (
                            <img
                              src={starIcon}
                              alt=""
                              className="artist-star-default"
                              style={{
                                left: `${getAdjustedStarLeft(artist)}px`,
                                top: getStarTop(artist),
                                width: `${getStarSize(artist)}px`,
                                height: `${getStarSize(artist)}px`,
                              }}
                            />
                          )}

                          <button
                            type="button"
                            className="artist-star-hitbox"
                            style={{
                              left: `${getAdjustedStarLeft(artist)}px`,
                              top: getStarTop(artist),
                              width: `${getStarSize(artist)}px`,
                              height: `${getStarSize(artist)}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggle(artist)
                            }}
                            aria-label={`${isSaved(artist) ? 'Remove' : 'Save'} ${artist.name}`}
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

      <ArtistOverlay
        artist={selectedArtist}
        image={selectedArtist ? artistProfiles[selectedArtist.name] : null}
        onClose={() => setSelectedArtist(null)}
      />
    </div>
  )
}

export default Lineup