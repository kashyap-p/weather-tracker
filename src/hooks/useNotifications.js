import { useEffect, useRef } from 'react'

const BAD_WEATHER_RULES = [
  { codes: [95, 96, 99], level: 'severe', emoji: '⛈️', message: 'Thunderstorm warning! Seek shelter indoors.' },
  { codes: [65, 67, 82], level: 'severe', emoji: '🌧️', message: 'Heavy rain expected. Carry an umbrella!' },
  { codes: [75, 77, 86], level: 'high', emoji: '❄️', message: 'Heavy snow expected. Travel with caution!' },
  { codes: [71, 73, 85], level: 'moderate', emoji: '🌨️', message: 'Snow is forecasted. Dress warmly!' },
  { codes: [61, 63, 80, 81], level: 'moderate', emoji: '🌦️', message: 'Rain expected. Grab an umbrella.' },
  { codes: [51, 53, 55, 56, 57], level: 'mild', emoji: '🌦️', message: 'Light drizzle expected.' },
  { codes: [45, 48], level: 'moderate', emoji: '🌫️', message: 'Foggy conditions. Drive carefully!' },
]

function getBadWeather(current, daily) {
  if (!current) return null
  const code = current.weather_code
  const warnings = []

  for (const rule of BAD_WEATHER_RULES) {
    if (rule.codes.includes(code)) {
      warnings.push(rule)
    }
  }

  if (current.temperature_2m >= 40) {
    warnings.push({ level: 'severe', emoji: '🔥', message: 'Extreme heat! Stay hydrated and avoid outdoors.' })
  } else if (current.temperature_2m >= 37) {
    warnings.push({ level: 'high', emoji: '🌡️', message: 'Very hot today. Stay cool and drink water.' })
  } else if (current.temperature_2m <= 0) {
    warnings.push({ level: 'high', emoji: '🥶', message: 'Freezing temperatures! Bundle up.' })
  }

  if (current.uv_index >= 8) {
    warnings.push({ level: 'high', emoji: '☀️', message: 'Very high UV! Use sunscreen and wear protection.' })
  } else if (current.uv_index >= 6) {
    warnings.push({ level: 'moderate', emoji: '☀️', message: 'High UV today. Sun protection advised.' })
  }

  if (current.wind_speed_10m >= 50) {
    warnings.push({ level: 'severe', emoji: '💨', message: 'Strong winds! Secure loose objects.' })
  } else if (current.wind_speed_10m >= 30) {
    warnings.push({ level: 'moderate', emoji: '💨', message: 'Windy conditions expected.' })
  }

  if (daily) {
    const maxPrecip = Math.max(...(daily.precipitation_probability_max || [0]))
    if (maxPrecip >= 80) {
      warnings.push({ level: 'high', emoji: '🌧️', message: 'High chance of rain today: ' + maxPrecip + '%' })
    }
  }

  if (warnings.length === 0) return null

  const highest = warnings.reduce((a, b) => {
    const levels = { mild: 1, moderate: 2, high: 3, severe: 4 }
    return levels[a.level] >= levels[b.level] ? a : b
  })

  const severeCount = warnings.filter(w => w.level === 'severe' || w.level === 'high').length
  if (severeCount > 1) {
    highest.message += ' (' + severeCount + ' alerts active)'
  }

  return highest
}

export default function useNotifications(weather) {
  const notified = useRef(new Set())

  useEffect(() => {
    if (!weather?.current) return

    const saved = JSON.parse(localStorage.getItem('wt-notified') || '[]')
    const cache = new Set(saved)

    const bad = getBadWeather(weather.current, weather.daily)
    if (!bad) return

    const cacheKey = bad.message.slice(0, 40) + '-' + new Date().toDateString()

    if (cache.has(cacheKey)) return

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(bad.emoji + ' Weather Alert', {
        body: bad.message,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="80">' + bad.emoji + '</text></svg>',
        silent: false,
      })
    }

    cache.add(cacheKey)
    const arr = Array.from(cache)
    if (arr.length > 20) arr.splice(0, arr.length - 20)
    localStorage.setItem('wt-notified', JSON.stringify(arr))
  }, [weather])
}
