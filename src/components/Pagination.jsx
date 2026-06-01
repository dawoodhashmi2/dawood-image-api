function Pagination({ page, totalPages, onNext, onPrev, loading }) {
  if (totalPages === 0) return null
  return (
    <div className="pagination">
      <button className="page-btn" onClick={onPrev} disabled={page === 1 || loading}>
        ← Prev
      </button>
      <div className="page-info">
        <span className="page-current">{String(page).padStart(2, '0')}</span>
        <span className="page-total">of {String(totalPages).padStart(2, '0')}</span>
      </div>
      <button className="page-btn" onClick={onNext} disabled={page === totalPages || loading}>
        Next →
      </button>
    </div>
  )
}
export default Pagination
