import { useState, useEffect, useRef } from 'react'
import { searchCities } from '../utils/api'

export default function Header({ onSearch, onRefresh, loading, unit, onUnitToggle, theme, onThemeToggle }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const debounceRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (query.trim().length < 1) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchCities(query.trim())
        if (results.length) {
          setSuggestions(results)
          setShowSuggestions(true)
          setActiveIdx(-1)
        } else {
          setSuggestions([])
          setShowSuggestions(false)
        }
      } catch {
        setSuggestions([])
      }
    }, 80)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function select(city) {
    setQuery(city.name)
    setShowSuggestions(false)
    onSearch(city.name)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (activeIdx >= 0 && suggestions[activeIdx]) {
      select(suggestions[activeIdx])
    } else if (query.trim()) {
      setShowSuggestions(false)
      onSearch(query.trim())
    }
  }

  function handleKeyDown(e) {
    if (!showSuggestions || !suggestions.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <header className="glass header">
      <div className="header-left">
        <h1 className={`app-title${loading ? ' refreshing' : ''}`} onClick={onRefresh} title="Refresh weather data">Weather</h1>
      </div>
      <div className="search-wrap" ref={wrapRef}>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (suggestions.length) setShowSuggestions(true) }}
            placeholder="Search city..."
            autoComplete="off"
          />
          <button type="submit" aria-label="Search">Search</button>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((s, i) => (
              <li
                key={`${s.lat}-${s.lon}`}
                className={i === activeIdx ? 'active' : ''}
                onMouseDown={() => select(s)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className="sug-name">{s.name}</span>
                <span className="sug-detail">{s.admin ? `${s.admin}, ${s.country}` : s.country}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="header-right">
        <button className="theme-btn" onClick={onThemeToggle} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="unit-toggle">
          <button className={unit === 'C' ? 'active' : ''} onClick={() => onUnitToggle('C')}>°C</button>
          <button className={unit === 'F' ? 'active' : ''} onClick={() => onUnitToggle('F')}>°F</button>
        </div>
      </div>
    </header>
  )
}
