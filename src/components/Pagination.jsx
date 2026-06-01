// TASK 5: Pagination — Next / Prev + BONUS: page number dikhao
function Pagination({ page, totalPages, onNext, onPrev, loading }) {
  if (totalPages === 0) return null

  return (
    <div className="pagination">
      {/* BONUS: disable while loading */}
      <button
        className="page-btn"
        onClick={onPrev}
        disabled={page === 1 || loading}
      >
        ← Prev
      </button>

      {/* BONUS: current page number */}
      <span className="page-info">Page {page} of {totalPages}</span>

      <button
        className="page-btn"
        onClick={onNext}
        disabled={page === totalPages || loading}
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination
