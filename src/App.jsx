import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWeather from './hooks/useWeather'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import Highlights from './components/Highlights'
import { getDynamicGradient } from './utils/weatherCodes'
import Scene3D from './components/Scene3D'
import useNotifications from './hooks/useNotifications'

const DataModal = lazy(() => import('./components/DataModal'))

export default function App() {
  const {
    weather, location, loading, error, unit, selectedDay, mockUsed,
    setUnit, setSelectedDay, setError, loadByCoords, searchCity, refresh,
  } = useWeather()

  const [theme, setTheme] = useState(() => localStorage.getItem('wt-theme') || 'dark')
  const [bgGradient, setBgGradient] = useState(['#0f172a', '#1e293b'])
  const [toast, setToast] = useState('')
  const [modalData, setModalData] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('wt-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  useNotifications(weather)

  useEffect(() => {
    if (weather) {
      setBgGradient(getDynamicGradient(weather.current.temperature_2m, weather.current.time, weather.current.weather_code))
    }
  }, [weather])

  useEffect(() => {
    if (error) {
      setToast(error)
      const t = setTimeout(() => { setToast(''); setError('') }, 5000)
      return () => clearTimeout(t)
    }
  }, [error, setError])

  useEffect(() => {
    if (!navigator.geolocation) {
      loadByCoords(28.6139, 77.209)
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => loadByCoords(pos.coords.latitude, pos.coords.longitude),
      () => loadByCoords(28.6139, 77.209),
      { timeout: 8000, enableHighAccuracy: false }
    )
  }, [loadByCoords])

  const handleFieldClick = useCallback((field, value) => {
    setModalData({ field, value })
  }, [])

  const closeModal = useCallback(() => setModalData(null), [])

  return (
    <ErrorBoundary>
      <div className="app" style={{ '--gradient-1': bgGradient[0], '--gradient-2': bgGradient[1] }}>
        <div className="bg-overlay" />
        {theme === 'dark' ? <div className="dark-tint" /> : <div className="light-tint" />}

        {weather && (
            <Scene3D weatherCode={weather.current.weather_code} />
        )}

        <div className="container">
          <Header
            onSearch={searchCity}
            onRefresh={refresh}
            loading={loading}
            unit={unit}
            onUnitToggle={setUnit}
            theme={theme}
            onThemeToggle={toggleTheme}
          />

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                className="loading-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
                <p>Fetching weather data...</p>
              </motion.div>
            )}

            {!loading && weather && (
              <motion.div
                key="weather"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {mockUsed.current && (
                  <motion.div
                    className="glass demo-notice"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span>⚠️ Using sample data — API unavailable. <button className="retry-btn inline" onClick={() => loadByCoords(28.6139, 77.209)}>Retry</button></span>
                  </motion.div>
                )}
                <div className="main-grid">
                  <CurrentWeather data={weather} location={location} unit={unit} onFieldClick={handleFieldClick} />
                  <WeatherDetails data={weather} unit={unit} onFieldClick={handleFieldClick} />
                  <Highlights data={weather} unit={unit} onFieldClick={handleFieldClick} />
                  <HourlyForecast data={weather} unit={unit} selectedDay={selectedDay} onFieldClick={handleFieldClick} />
                  <div className="wrap-full">
                    <DailyForecast
                      data={weather}
                      unit={unit}
                      selectedDay={selectedDay}
                      onSelectDay={setSelectedDay}
                      onFieldClick={handleFieldClick}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {!loading && !weather && (
              <motion.div
                key="idle"
                className="loading-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p
                  className="idle-text"
                  style={{ color: error ? '#f87171' : undefined }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                  {error || 'Search for a city to see weather'}
                </motion.p>
                {error && (
                  <motion.button
                    className="retry-btn"
                    onClick={() => loadByCoords(28.6139, 77.209)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Retry
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.footer
            className="glass footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>Data from <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</a></p>
          </motion.footer>
        </div>

        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span>{toast}</span>
            <button onClick={() => { setToast(''); setError('') }}>✕</button>
          </motion.div>
        )}

        {modalData && (
          <Suspense fallback={null}>
            <DataModal
              field={modalData.field}
              value={modalData.value}
              onClose={closeModal}
            />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  )
}
