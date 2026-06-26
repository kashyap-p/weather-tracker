const WEATHER = {
  0: { icon: '☀️', desc: 'Clear Sky', pt: 'sun' },
  1: { icon: '🌤️', desc: 'Mainly Clear', pt: 'sun' },
  2: { icon: '⛅', desc: 'Partly Cloudy', pt: 'cloud' },
  3: { icon: '☁️', desc: 'Overcast', pt: 'cloud' },
  45: { icon: '🌫️', desc: 'Foggy', pt: 'fog' },
  48: { icon: '🌫️', desc: 'Depositing Rime Fog', pt: 'fog' },
  51: { icon: '🌦️', desc: 'Light Drizzle', pt: 'rain' },
  53: { icon: '🌦️', desc: 'Moderate Drizzle', pt: 'rain' },
  55: { icon: '🌦️', desc: 'Dense Drizzle', pt: 'rain' },
  56: { icon: '🌧️', desc: 'Light Freezing Drizzle', pt: 'rain' },
  57: { icon: '🌧️', desc: 'Dense Freezing Drizzle', pt: 'rain' },
  61: { icon: '🌧️', desc: 'Slight Rain', pt: 'rain' },
  63: { icon: '🌧️', desc: 'Moderate Rain', pt: 'rain' },
  65: { icon: '🌧️', desc: 'Heavy Rain', pt: 'rain' },
  66: { icon: '🌧️', desc: 'Light Freezing Rain', pt: 'rain' },
  67: { icon: '🌧️', desc: 'Heavy Freezing Rain', pt: 'rain' },
  71: { icon: '🌨️', desc: 'Slight Snow', pt: 'snow' },
  73: { icon: '🌨️', desc: 'Moderate Snow', pt: 'snow' },
  75: { icon: '🌨️', desc: 'Heavy Snow', pt: 'snow' },
  77: { icon: '❄️', desc: 'Snow Grains', pt: 'snow' },
  80: { icon: '🌦️', desc: 'Slight Rain Showers', pt: 'rain' },
  81: { icon: '🌦️', desc: 'Moderate Rain Showers', pt: 'rain' },
  82: { icon: '🌦️', desc: 'Violent Rain Showers', pt: 'rain' },
  85: { icon: '🌨️', desc: 'Slight Snow Showers', pt: 'snow' },
  86: { icon: '🌨️', desc: 'Heavy Snow Showers', pt: 'snow' },
  95: { icon: '⛈️', desc: 'Thunderstorm', pt: 'storm' },
  96: { icon: '⛈️', desc: 'Thunderstorm with Hail', pt: 'storm' },
  99: { icon: '⛈️', desc: 'Thunderstorm with Hail', pt: 'storm' },
}

export function getWeatherInfo(code) {
  const w = WEATHER[code]
  return {
    icon: w?.icon || '🌡️',
    desc: w?.desc || 'Unknown',
    particleType: w?.pt || 'sun',
  }
}

export function getWindDirection(degree) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return dirs[Math.round(degree / 22.5) % 16]
}

export function formatTime(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function formatHour(dateStr) {
  const d = new Date(dateStr)
  const h = d.getHours()
  return `${h}:00`
}

export function formatDay(dateStr) {
  const date = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function convertTemp(celsius, unit) {
  if (unit === 'F') return Math.round(celsius * 9 / 5 + 32)
  return Math.round(celsius)
}

function blendColor(hex, dr, dg, db) {
  const n = parseInt(hex.replace('#',''), 16)
  let r = Math.min(255, Math.max(0, ((n>>16)&255) + dr))
  let g = Math.min(255, Math.max(0, ((n>>8)&255) + dg))
  let b = Math.min(255, Math.max(0, (n&255) + db))
  return `#${((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}`
}

export function getDynamicGradient(temp, timeStr, weatherCode) {
  const hour = new Date(timeStr).getHours()
  const isDay = hour >= 6 && hour < 18
  const isEvening = hour >= 18 && hour < 20
  const isNight = hour < 6 || hour >= 20

  let c1, c2

  if (isNight) {
    c1 = '#0a0a1a'; c2 = '#1a1a3e'
    if (temp > 30) { c1 = blendColor(c1, 15, -5, 5); c2 = blendColor(c2, 20, 0, 10) }
    if (temp < 10) { c1 = blendColor(c1, 0, 5, 15); c2 = blendColor(c2, -5, 5, 20) }
  } else if (isEvening) {
    c1 = '#3d1a4e'; c2 = '#e85d3a'
    if (temp > 30) { c1 = blendColor(c1, 10, 5, 0); c2 = blendColor(c2, 10, 5, -10) }
    if (temp < 10) { c1 = blendColor(c1, -5, 0, 15); c2 = blendColor(c2, -10, 5, 20) }
  } else {
    c1 = '#2563eb'; c2 = '#60a5fa'
    if (temp > 35) { c1 = blendColor(c1, 30, 10, -20); c2 = blendColor(c2, 20, 5, -30) }
    else if (temp > 30) { c1 = blendColor(c1, 15, 5, -10); c2 = blendColor(c2, 10, 0, -15) }
    if (temp < 15) { c1 = blendColor(c1, -10, 5, 20); c2 = blendColor(c2, -5, 10, 15) }
    else if (temp < 5) { c1 = blendColor(c1, -15, 10, 30); c2 = blendColor(c2, -10, 15, 25) }
  }

  if (weatherCode >= 95) { c1 = blendColor(c1, 20, -10, -15); c2 = blendColor(c2, 30, -15, -20) }
  else if (weatherCode >= 71 && weatherCode <= 77) { c1 = blendColor(c1, 30, 30, 40); c2 = blendColor(c2, 40, 40, 50) }
  else if ((weatherCode >= 61 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) { c1 = blendColor(c1, -15, -10, 5); c2 = blendColor(c2, -10, -5, 0) }
  else if (weatherCode >= 45 && weatherCode <= 48) { c1 = blendColor(c1, 10, 10, 15); c2 = blendColor(c2, 5, 5, 10) }
  else if (weatherCode >= 3) { c1 = blendColor(c1, 0, 0, 10); c2 = blendColor(c2, -5, 0, 5) }

  return [c1, c2]
}
