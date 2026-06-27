import { useState, useEffect, useRef } from 'react'
import { searchCities } from '../utils/api'
import { motion, AnimatePresence } from 'framer-motion'

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
    <motion.header
      className="glass header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="header-left">
        <motion.h1
          className={`app-title${loading ? ' refreshing' : ''}`}
          onClick={onRefresh}
          title="Refresh weather data"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >Weather</motion.h1>
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
          <motion.button
            type="submit"
            aria-label="Search"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >Search</motion.button>
        </form>
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.ul
              className="suggestions"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {suggestions.map((s, i) => (
                <motion.li
                  key={`${s.lat}-${s.lon}`}
                  className={i === activeIdx ? 'active' : ''}
                  onMouseDown={() => select(s)}
                  onMouseEnter={() => setActiveIdx(i)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <span className="sug-name">{s.name}</span>
                  <span className="sug-detail">{s.admin ? `${s.admin}, ${s.country}` : s.country}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <div className="header-right">
        <motion.button
          className="theme-btn"
          onClick={onThemeToggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>
        <div className="unit-toggle">
          <motion.button
            className={unit === 'C' ? 'active' : ''}
            onClick={() => onUnitToggle('C')}
            whileTap={{ scale: 0.9 }}
          >°C</motion.button>
          <motion.button
            className={unit === 'F' ? 'active' : ''}
            onClick={() => onUnitToggle('F')}
            whileTap={{ scale: 0.9 }}
          >°F</motion.button>
        </div>
      </div>
    </motion.header>
  )
}
