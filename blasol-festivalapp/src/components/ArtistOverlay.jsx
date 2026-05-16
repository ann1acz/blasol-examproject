import '../css/artistOverlay.css'

function ArtistOverlay({ artist, image, onClose }) {
  if (!artist || !image) return null

  return (
    <div className="artist-overlay-backdrop" onClick={onClose}>
      <div
        className="artist-overlay-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="artist-overlay-close"
          onClick={onClose}
          aria-label="Close artist profile"
        >
          ×
        </button>

        <img
          src={image}
          alt={`${artist.name} profile`}
          className="artist-overlay-image"
        />
      </div>
    </div>
  )
}

export default ArtistOverlay