import { useState, useEffect } from 'react'
import useWeather from './hooks/useWeather'
import ErrorBoundary from './components/ErrorBoundary'
import ParticleBackground from './components/ParticleBackground'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import Highlights from './components/Highlights'
import { getWeatherInfo, getDynamicGradient } from './utils/weatherCodes'

export default function App() {
  const {
    weather, location, loading, error, unit, selectedDay, mockUsed,
    setUnit, setSelectedDay, setError, loadByCoords, searchCity, refresh,
  } = useWeather()

  const [theme, setTheme] = useState(() => localStorage.getItem('wt-theme') || 'dark')
  const [bgGradient, setBgGradient] = useState(['#0f172a', '#1e293b'])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('wt-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }
  const [particleType, setParticleType] = useState('sun')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (weather) {
      const info = getWeatherInfo(weather.current.weather_code)
      setBgGradient(getDynamicGradient(weather.current.temperature_2m, weather.current.time, weather.current.weather_code))
      setParticleType(info.particleType)
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

  return (
    <ErrorBoundary>
      <div className="app" style={{ '--gradient-1': bgGradient[0], '--gradient-2': bgGradient[1] }}>
        <ParticleBackground type={particleType} />
        <div className="bg-overlay" />
        {theme === 'dark' ? <div className="dark-tint" /> : <div className="light-tint" />}

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

          {loading && (
            <div className="loading-wrap">
              <div className="spinner" />
              <p>Fetching weather data...</p>
            </div>
          )}

          {!loading && weather && (
            <>
              {mockUsed.current && (
                <div className="glass demo-notice">
                  <span>⚠️ Using sample data — API unavailable. <button className="retry-btn inline" onClick={() => loadByCoords(28.6139, 77.209)}>Retry</button></span>
                </div>
              )}
              <div className="main-grid">
                <CurrentWeather data={weather} location={location} unit={unit} />
                <WeatherDetails data={weather} unit={unit} />
                <Highlights data={weather} unit={unit} />
                <HourlyForecast data={weather} unit={unit} selectedDay={selectedDay} />
                <div className="wrap-full">
                  <DailyForecast
                    data={weather}
                    unit={unit}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                  />
                </div>
              </div>
            </>
          )}

          {!loading && !weather && (
            <div className="loading-wrap">
              <p className="idle-text" style={{ color: error ? '#f87171' : undefined }}>
                {error || 'Search for a city to see weather'}
              </p>
              {error && (
                <button className="retry-btn" onClick={() => loadByCoords(28.6139, 77.209)}>
                  Retry
                </button>
              )}
            </div>
          )}

          <footer className="glass footer">
            <p>Data from <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</a></p>
          </footer>
        </div>

        {toast && (
          <div className="toast">
            <span>{toast}</span>
            <button onClick={() => { setToast(''); setError('') }}>✕</button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
