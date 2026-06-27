import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const weatherDatalore = {
  temperature_2m: {
    label: 'Temperature',
    desc: 'Current air temperature measured at 2 meters above ground level. This is the standard meteorological measurement you see in weather reports.',
    icon: '🌡️',
  },
  relative_humidity_2m: {
    label: 'Humidity',
    desc: 'The amount of water vapor present in the air relative to the maximum it can hold at the current temperature. Higher humidity makes the air feel more muggy.',
    icon: '💧',
  },
  apparent_temperature: {
    label: 'Feels Like',
    desc: 'The perceived temperature taking into account humidity and wind. On humid days, it feels hotter; on windy days, it feels cooler than the actual temperature.',
    icon: '🌡️',
  },
  weather_code: {
    label: 'Weather Code',
    desc: 'WMO weather code indicating the current weather condition. Codes 0-3: clear to overcast, 45-48: fog, 51-57: drizzle, 61-67: rain, 71-77: snow, 80-86: showers, 95-99: thunderstorms.',
    icon: '🌤️',
  },
  wind_speed_10m: {
    label: 'Wind Speed',
    desc: 'Wind speed measured at 10 meters above ground level. The standard height for wind measurements to avoid surface friction effects.',
    icon: '💨',
  },
  wind_direction_10m: {
    label: 'Wind Direction',
    desc: 'The direction from which the wind originates. A north wind blows from north to south. Measured in degrees clockwise from true north.',
    icon: '🧭',
  },
  pressure_msl: {
    label: 'Pressure (MSL)',
    desc: 'Atmospheric pressure adjusted to mean sea level. Used for weather forecasting — rising pressure usually means improving weather, falling pressure indicates storms.',
    icon: '🔽',
  },
  visibility: {
    label: 'Visibility',
    desc: 'The maximum distance at which objects can be clearly seen. Affected by fog, rain, dust, and other atmospheric conditions.',
    icon: '👁️',
  },
  uv_index: {
    label: 'UV Index',
    desc: 'Measure of the strength of sunburn-producing ultraviolet radiation. 0-2: Low, 3-5: Moderate, 6-7: High, 8-10: Very High, 11+: Extreme. Protection recommended above 3.',
    icon: '☀️',
  },
  precipitation_probability: {
    label: 'Precipitation Probability',
    desc: 'The likelihood of precipitation occurring at any point in the forecast area. A 60% chance means there is a 60% probability of measurable precipitation.',
    icon: '🌧️',
  },
  precipitation_sum: {
    label: 'Precipitation Total',
    desc: 'The total amount of precipitation (rain, snow, etc.) expected to fall over the given period. Measured in millimeters of liquid water equivalent.',
    icon: '📊',
  },
  temperature_2m_max: {
    label: 'Max Temperature',
    desc: 'The highest temperature expected during the day. Typically occurs in the mid-to-late afternoon when solar radiation is strongest.',
    icon: '🔺',
  },
  temperature_2m_min: {
    label: 'Min Temperature',
    desc: 'The lowest temperature expected during the day. Usually occurs just before sunrise when the ground has had all night to radiate heat away.',
    icon: '🔻',
  },
  sunrise: {
    label: 'Sunrise',
    desc: 'The moment the upper edge of the sun becomes visible above the horizon. Atmospheric refraction makes the sun appear to rise earlier than it actually does.',
    icon: '🌅',
  },
  sunset: {
    label: 'Sunset',
    desc: 'The moment the upper edge of the sun disappears below the horizon. The golden hour before sunset provides the warmest, most diffused light.',
    icon: '🌇',
  },
}

export default function DataModal({ field, value, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const info = weatherDatalore[field] || {
    label: field,
    desc: 'Detailed weather data point used in meteorological analysis.',
    icon: '📊',
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content glass"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-icon">{info.icon}</div>
          <h2 className="modal-title">{info.label}</h2>
          <div className="modal-value">{value}</div>
          <p className="modal-desc">{info.desc}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
