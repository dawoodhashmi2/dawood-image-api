// TASK 3: Enter key se search + button click se search
function SearchBar({ query, setQuery, onSearch, loading }) {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch()  // TASK 3: Enter key
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="searh images "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}    // TASK 3
        disabled={loading}           // BONUS: input disable while loading
        className="search-input"
      />
      <button
        onClick={onSearch}
        disabled={loading}           // BONUS: button disable while loading
        className="search-btn"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}

export default SearchBar
