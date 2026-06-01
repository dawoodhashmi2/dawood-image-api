import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Gallery from './components/Gallery'
import Pagination from './components/Pagination'
import ThemeToggle from './components/ThemeToggle'

// API Key — .env kaam na kare to seedha yahan hai
const ACCESS_KEY = import.meta.env.VITE_DAWOOD || 'x8jCbhBn-bfee_oYRr0vCse6xWK1i6pzkJl8iRYbTVI'
const PER_PAGE = 20  // TASK 5: 20 per page

function App() {
  const [query, setQuery]           = useState('')
  const [images, setImages]         = useState([])
  const [loading, setLoading]       = useState(false)   // TASK 1
  const [page, setPage]             = useState(1)        // TASK 5
  const [totalPages, setTotalPages] = useState(0)
  const [theme, setTheme]           = useState('light')  // TASK 4
  const [searched, setSearched]     = useState(false)
  const [error, setError]           = useState('')

  const search = async (pageNumber = 1) => {
    if (!query.trim()) return

    setLoading(true)   // TASK 1: ON
    setSearched(true)
    setError('')

    try {
      const url = `https://api.unsplash.com/search/photos`
        + `?query=${encodeURIComponent(query)}`
        + `&per_page=${PER_PAGE}`
        + `&page=${pageNumber}`
        + `&client_id=${ACCESS_KEY}`

      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      const data = await res.json()

      // Unsplash kabhi kabhi errors array deta hai
      if (data.errors) {
        throw new Error(data.errors[0])
      }

      setImages(data.results || [])
      setTotalPages(data.total_pages || 0)
      setPage(pageNumber)

    } catch (err) {
      console.error('API Error:', err.message)
      setError(err.message)
      setImages([])
    }

    setLoading(false)  // TASK 1: OFF
  }

  const handleNext = () => search(page + 1)
  const handlePrev = () => search(page - 1)

  return (
    <div className={`app-wrapper ${theme}-mode`}>

      <header className="app-header">
        <h1 className="app-title"> Image Search</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />  {/* TASK 4 */}
      </header>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => search(1)}
        loading={loading}
      />

      {/* Error message */}
      {error && (
        <div className="error-box">
          ⚠️ Error: {error}
        </div>
      )}

      {searched && !error && (
        <>
          <Gallery images={images} loading={loading} />

          {!loading && images.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
