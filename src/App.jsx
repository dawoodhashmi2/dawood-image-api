import { useState, useEffect, useRef } from 'react'
import './App.css'
import Gallery from './components/Gallery'
import Pagination from './components/Pagination'
import ThemeToggle from './components/ThemeToggle'

const ACCESS_KEY = import.meta.env.VITE_DAWOOD || 'x8jCbhBn-bfee_oYRr0vCse6xWK1i6pzkJl8iRYbTVI'
const PER_PAGE = 20

function App() {
  const [query, setQuery]           = useState('')
  const [images, setImages]         = useState([])
  const [loading, setLoading]       = useState(false)
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [theme, setTheme]           = useState('dark')
  const [searched, setSearched]     = useState(false)
  const [lastQuery, setLastQuery]   = useState('')
  const [error, setError]           = useState('')
  const cursorRef  = useRef(null)
  const ringRef    = useRef(null)

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current)  { cursorRef.current.style.left = e.clientX + 'px'; cursorRef.current.style.top = e.clientY + 'px'; }
      if (ringRef.current)    { ringRef.current.style.left   = e.clientX + 'px'; ringRef.current.style.top  = e.clientY + 'px'; }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const search = async (pageNumber = 1) => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    setError('')
    setLastQuery(query)

    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${pageNumber}&client_id=${ACCESS_KEY}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.errors) throw new Error(data.errors[0])
      setImages(data.results || [])
      setTotalPages(data.total_pages || 0)
      setTotalResults(data.total || 0)
      setPage(pageNumber)
    } catch (err) {
      setError(err.message)
      setImages([])
    }

    setLoading(false)
  }

  return (
    <>
      {/* Custom cursors */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      <div className={`app ${theme}`}>
        {/* Header */}
        <header className="header">
          <div className="logo">
            <span className="logo-eyebrow">Visual Discovery</span>
            <h1 className="logo-title">Lens<em>earch</em></h1>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        {/* Hero Search */}
        <section className="hero">
          <p className="hero-tagline">Powered by Unsplash</p>
          <h2 className="hero-heading">Find <em>beautiful</em><br/>imagery</h2>

          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              placeholder="Search anything — mountains, portraits, abstract..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search(1)}
              disabled={loading}
            />
            <button
              className="search-btn"
              onClick={() => search(1)}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search →'}
            </button>
          </div>
          <p className="search-hint">Press <kbd>Enter</kbd> or click the button</p>
        </section>

        {/* Error */}
        {error && <div className="error-state">⚠ {error}</div>}

        {/* Results bar */}
        {searched && !loading && !error && images.length > 0 && (
          <div className="results-bar">
            <span className="results-count">
              <strong>{totalResults.toLocaleString()}</strong> results
            </span>
            <span className="results-query">"{lastQuery}"</span>
            <span className="results-count">Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
          </div>
        )}

        {/* Gallery */}
        {searched && !error && (
          <Gallery images={images} loading={loading} />
        )}

        {/* Pagination */}
        {searched && !loading && !error && images.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onNext={() => search(page + 1)}
            onPrev={() => search(page - 1)}
            loading={loading}
          />
        )}
      </div>
    </>
  )
}

export default App
