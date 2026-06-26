const BASE = 'https://api.open-meteo.com/v1'
const GEO = 'https://geocoding-api.open-meteo.com/v1'

async function fetchJSON(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

export async function searchCities(query) {
  const url = `${GEO}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  const data = await fetchJSON(url)
  if (!data.results?.length) return []
  return data.results.map(r => ({
    name: r.name,
    admin: r.admin1 || '',
    country: r.country || '',
    lat: r.latitude,
    lon: r.longitude,
  }))
}

export async function geocodeCity(city) {
  const results = await searchCities(city)
  if (!results.length) throw new Error('City not found')
  return results[0]
}

export async function reverseGeocode(lat, lon) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  const text = await fetchText(url)
  const data = JSON.parse(text)
  return {
    name: data.city || data.locality || data.principalSubdivision || 'Current Location',
    country: data.countryName || '',
    admin: data.principalSubdivision || '',
  }
}

export async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,surface_pressure,visibility,uv_index',
    hourly: 'temperature_2m,weather_code,precipitation_probability,uv_index,visibility',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max,wind_speed_10m_max,wind_direction_10m_dominant',
    timezone: 'auto',
    forecast_days: 6,
  })
  return fetchJSON(`${BASE}/forecast?${params}`)
}
