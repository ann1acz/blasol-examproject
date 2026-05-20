import { useEffect, useRef, useState } from 'react'
import legendImage_Friends from '../assets/legend_friends.png'
import headerImage from '../assets/header.png'
import friendsBg from '../assets/friendsbg.png'
import youImage from '../assets/you-friends.png'
import friend1 from '../assets/friend1.png'
import friend2 from '../assets/friend2.png'
import friend3 from '../assets/friend3.png'
import friend4 from '../assets/friend4.png'
import addFriendImage from '../assets/addfriend.png'
import defaultviewButton from '../assets/default-button.png'
import expandButton from '../assets/expand-button.png'
import mapImage_Friends from '../assets/map_friends.png'
import '../css/friends.css'

const friendCards = [
  { name: 'Friend 1', image: friend1 },
  { name: 'Friend 2', image: friend2 },
  { name: 'Friend 3', image: friend3 },
  { name: 'Friend 4', image: friend4 },
]

function MapBigger() {
  const DEFAULT_SCALE = 1.8
  const MIN_SCALE = 1.8
  const MAX_SCALE = 3.5
  const ZOOM_STEP = 0.2

  const viewportRef = useRef(null)
  const mapRef = useRef(null)
  const dragState = useRef({ active: false, pointerId: null, lastX: 0, lastY: 0 })

  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const resetDragState = () => {
    dragState.current = { active: false, pointerId: null, lastX: 0, lastY: 0 }
    setIsDragging(false)
  }

  useEffect(() => {
    const forceStopDragging = () => {
      resetDragState()
    }

    const stopDraggingOutsideViewport = (event) => {
      const viewportEl = viewportRef.current
      if (!viewportEl) {
        return
      }

      if (!viewportEl.contains(event.target)) {
        resetDragState()
      }
    }

    window.addEventListener('pointerup', forceStopDragging)
    window.addEventListener('pointercancel', forceStopDragging)
    window.addEventListener('blur', forceStopDragging)
    window.addEventListener('pointerdown', stopDraggingOutsideViewport, true)

    return () => {
      window.removeEventListener('pointerup', forceStopDragging)
      window.removeEventListener('pointercancel', forceStopDragging)
      window.removeEventListener('blur', forceStopDragging)
      window.removeEventListener('pointerdown', stopDraggingOutsideViewport, true)
      resetDragState()
    }
  }, [])

  const clampScale = (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

  const clampOffset = (nextOffset, nextScale) => {
    const viewportEl = viewportRef.current
    const mapEl = mapRef.current

    if (!viewportEl || !mapEl) {
      return nextOffset
    }

    const viewportWidth = viewportEl.clientWidth
    const viewportHeight = viewportEl.clientHeight
    const baseWidth = mapEl.offsetWidth
    const baseHeight = mapEl.offsetHeight

    if (baseWidth === 0 || baseHeight === 0) {
      return nextOffset
    }

    const scaledWidth = baseWidth * nextScale
    const scaledHeight = baseHeight * nextScale

    const minX = Math.min(0, viewportWidth - scaledWidth)
    const maxX = scaledWidth <= viewportWidth ? (viewportWidth - scaledWidth) / 2 : 0
    const minY = Math.min(0, viewportHeight - scaledHeight)
    const maxY = scaledHeight <= viewportHeight ? (viewportHeight - scaledHeight) / 2 : 0

    return {
      x: Math.min(maxX, Math.max(minX, nextOffset.x)),
      y: Math.min(maxY, Math.max(minY, nextOffset.y)),
    }
  }

  const updateScale = (delta, focalPoint) => {
    setScale((previousScale) => {
      const nextScale = clampScale(previousScale + delta)

      if (nextScale === previousScale) {
        return previousScale
      }

      setOffset((previousOffset) => {
        if (!focalPoint) {
          return clampOffset(previousOffset, nextScale)
        }

        const ratio = nextScale / previousScale
        const nextOffset = {
          x: focalPoint.x - (focalPoint.x - previousOffset.x) * ratio,
          y: focalPoint.y - (focalPoint.y - previousOffset.y) * ratio,
        }

        return clampOffset(nextOffset, nextScale)
      })

      return nextScale
    })
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
    }

    setIsDragging(true)
  }

  const handlePointerMove = (event) => {
    const state = dragState.current

    if (!state.active || state.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - state.lastX
    const deltaY = event.clientY - state.lastY

    state.lastX = event.clientX
    state.lastY = event.clientY

    setOffset((previousOffset) => clampOffset({ x: previousOffset.x + deltaX, y: previousOffset.y + deltaY }, scale))
  }

  const stopDragging = (event) => {
    const state = dragState.current

    if (!state.active) {
      return
    }

    if (event && state.pointerId !== event.pointerId) {
      return
    }

    resetDragState()
  }

  const handleWheel = (event) => {
    event.preventDefault()

    const viewportRect = viewportRef.current?.getBoundingClientRect()

    if (!viewportRect) {
      return
    }

    const focalPoint = {
      x: event.clientX - viewportRect.left,
      y: event.clientY - viewportRect.top,
    }

    const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    updateScale(delta, focalPoint)
  }

  const centerMap = () => {
    setScale(DEFAULT_SCALE)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <section className="map-page">
      <header className="map-header">
        <img className="map-header-image" src={headerImage} alt="Map header" />
        <h1 className="page-title">Friends</h1>
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
        <a href="/map_bigger" className="map-button-expand" aria-label="Expand map">
          <img src={expandButton} alt="Expand" />
        </a>
        <a href="/map" className="map-button-default" aria-label="Default view">
          <img src={defaultviewButton} alt="Default view" />
        </a>
      </div>

      <section className="map-canvas-section" aria-label="Festival map">
        <div className="map-canvas-controls" aria-label="Map zoom controls">
          <button className="map-control-button" type="button" onClick={() => updateScale(ZOOM_STEP)} aria-label="Zoom in">
            +
          </button>
          <button className="map-control-button" type="button" onClick={() => updateScale(-ZOOM_STEP)} aria-label="Zoom out">
            -
          </button>
          <button className="map-control-button" type="button" onClick={centerMap} aria-label="Reset map position">
            Reset
          </button>
        </div>

        <div
          className={`map-canvas-viewport ${isDragging ? 'is-dragging' : ''}`}
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
          onWheel={handleWheel}
        >
          <img
            className="map-canvas-image"
            ref={mapRef}
            src={mapImage_Friends}
            alt="Festival grounds map"
            draggable="false"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          />
        </div>
      </section>

      <div className="map-legend-wrap">
        <img className="map-legend" src={legendImage_Friends} alt="Map legend" />
        <h2 className="legend-title">Legend</h2>
        <div className="legend-labels">
          <p className="legend-label you-are">You are here</p>
          <p className="legend-label friends-icons">Friends Icons</p>
        </div>
      </div>
    </section>
  )
}

export default MapBigger
