function Gallery({ images, loading }) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">Curating images...</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">◎</div>
        <p className="empty-title">No images found</p>
        <p className="empty-sub">Try a different search term</p>
      </div>
    )
  }

  return (
    <div className="gallery">
      {images.map((img) => (
        <div key={img.id} className="gallery-item">
          <img
            src={img.urls.small}
            alt={img.alt_description || 'Photo'}
            loading="lazy"
          />
          <div className="gallery-overlay">
            <div className="overlay-line"></div>
            <span className="overlay-name">{img.user.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gallery
