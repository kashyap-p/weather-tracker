import { useState, useEffect, useCallback, useRef } from 'react'
import { geocodeCity, reverseGeocode, fetchWeather } from '../utils/api'
import MOCK from '../utils/mock'

export default function useWeather() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState({ name: '', country: '', admin: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('C')
  const [selectedDay, setSelectedDay] = useState(0)
  const mockUsed = useRef(false)

  const loadByCoords = useCallback(async (lat, lon) => {
    setLoading(true)
    setError('')
    mockUsed.current = false
    try {
      const data = await fetchWeather(lat, lon)
      if (!data?.current) throw new Error('Empty response')
      setWeather(data)
      const geo = await reverseGeocode(lat, lon).catch(() => null)
      if (geo) setLocation(geo)
    } catch {
      setWeather(MOCK)
      setLocation({ name: 'Sample City', country: 'Demo', admin: 'Demo Region' })
      mockUsed.current = true
    } finally {
      setLoading(false)
    }
  }, [])

  const searchCity = useCallback(async (query) => {
    setLoading(true)
    setError('')
    mockUsed.current = false
    try {
      const loc = await geocodeCity(query)
      const data = await fetchWeather(loc.lat, loc.lon)
      if (!data?.current) throw new Error('Empty response')
      setWeather(data)
      setLocation({ name: loc.name, country: loc.country, admin: loc.admin })
    } catch {
      setWeather(MOCK)
      setLocation({ name: query || 'Unknown', country: 'Demo', admin: '' })
      mockUsed.current = true
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => {
    if (!weather) return
    loadByCoords(weather.latitude, weather.longitude)
  }, [weather, loadByCoords])

  return {
    weather, location, loading, error, unit, selectedDay, mockUsed,
    setUnit, setSelectedDay, setError, loadByCoords, searchCity, refresh,
  }
}
