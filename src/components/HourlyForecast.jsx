import { getWeatherInfo, convertTemp, formatHour } from '../utils/weatherCodes'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

export default function HourlyForecast({ data, unit, selectedDay, onFieldClick }) {
  const scrollRef = useRef(null)
  const unitSymbol = unit === 'F' ? '°F' : '°C'

  const dayOffset = Math.max(0, Math.min(selectedDay || 0, 5))
  const startIdx = dayOffset * 24
  const hours = (data.hourly.time || []).slice(startIdx, startIdx + 24)

  if (!hours.length) return null

  return (
    <AnimatedCard className="glass hourly-section" delay={0.15}>
      <div className="hourly-header">
        <h3>Hourly Forecast</h3>
        <button className="scroll-btn" onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}>←</button>
        <button className="scroll-btn" onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}>→</button>
      </div>
      <div className="hourly-scroll" ref={scrollRef}>
        {hours.map((time, i) => {
          const code = data.hourly.weather_code[startIdx + i]
          const temp = convertTemp(data.hourly.temperature_2m[startIdx + i], unit)
          const info = getWeatherInfo(code)
          const precip = data.hourly.precipitation_probability?.[startIdx + i] ?? 0
          const isNow = i === 0 && dayOffset === 0
          return (
            <motion.div
              key={i}
              className={`hourly-card${isNow ? ' now' : ''}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => onFieldClick('precipitation_probability', `${precip}%`)}
              style={{ cursor: 'pointer' }}
            >
              <span className="hourly-time">{isNow ? 'Now' : formatHour(time)}</span>
              <span className="hourly-icon">{info.icon}</span>
              <span className="hourly-temp">{temp}{unitSymbol}</span>
              {precip > 0 && <span className="hourly-precip">{precip}%</span>}
            </motion.div>
          )
        })}
      </div>
    </AnimatedCard>
  )
}
