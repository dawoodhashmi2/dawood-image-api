// TASK 1: Loading State  |  TASK 2: No Results Found
function Gallery({ images, loading }) {

  // TASK 1: Loading spinner dikhao
  if (loading) {
    return (
      <div className="status-box">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // TASK 2: No images found message
  if (images.length === 0) {
    return (
      <div className="status-box">
        <span className="no-result-icon">🔍</span>
        <p>No images found</p>
      </div>
    )
  }

  return (
    <div className="gallery-grid">
      {images.map((img) => (
        <div key={img.id} className="gallery-card">
          <img
            src={img.urls.small}
            alt={img.alt_description || 'Unsplash image'}
            loading="lazy"
          />
          <div className="card-overlay">
            <span> {img.user.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gallery
