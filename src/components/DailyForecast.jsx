import { getWeatherInfo, convertTemp, formatDay } from '../utils/weatherCodes'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

export default function DailyForecast({ data, unit, selectedDay, onSelectDay, onFieldClick }) {
  const unitSymbol = unit === 'F' ? '°F' : '°C'
  const d = data.daily

  return (
    <AnimatedCard className="glass daily-section" delay={0.25}>
      <h3>7-Day Forecast</h3>
      <div className="daily-list">
        {d.time.slice(0, 7).map((date, i) => {
          const info = getWeatherInfo(d.weather_code[i])
          const high = convertTemp(d.temperature_2m_max[i], unit)
          const low = convertTemp(d.temperature_2m_min[i], unit)
          const precip = d.precipitation_sum?.[i] ?? 0
          const isActive = selectedDay === i
          return (
            <motion.div
              key={i}
              className={`daily-row${isActive ? ' active' : ''}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              onClick={() => { onSelectDay(i); onFieldClick('precipitation_sum', `${precip.toFixed(1)} mm`) }}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelectDay(i)}
            >
              <span className="daily-name">{formatDay(date)}</span>
              <span className="daily-icon">{info.icon}</span>
              <div className="daily-temps">
                <span className="daily-high">{high}{unitSymbol}</span>
                <div className="daily-bar-wrap">
                  <div className="daily-bar">
                    <div
                      className="daily-bar-fill"
                      style={{
                        left: `${Math.max(0, ((low + 10) / 50) * 100)}%`,
                        right: `${Math.max(0, 100 - ((high + 10) / 50) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="daily-low">{low}{unitSymbol}</span>
              </div>
              <motion.span
                className="daily-precip"
                animate={precip > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >{precip > 0 ? `${precip.toFixed(1)}mm` : ''}</motion.span>
            </motion.div>
          )
        })}
      </div>
    </AnimatedCard>
  )
}
