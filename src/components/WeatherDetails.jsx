import { getWindDirection, convertTemp } from '../utils/weatherCodes'
import AnimatedCard from './AnimatedCard'

export default function WeatherDetails({ data, unit, onFieldClick }) {
  const c = data.current
  const unitSymbol = unit === 'F' ? '°F' : '°C'

  const details = [
    { label: 'Humidity', value: `${c.relative_humidity_2m}%`, icon: '💧', field: 'relative_humidity_2m' },
    { label: 'Wind', value: `${Math.round(c.wind_speed_10m)} km/h`, icon: '💨', field: 'wind_speed_10m' },
    { label: 'Direction', value: getWindDirection(c.wind_direction_10m), icon: '🧭', field: 'wind_direction_10m' },
    { label: 'Pressure', value: `${Math.round(c.surface_pressure || c.pressure_msl)} hPa`, icon: '🔽', field: 'pressure_msl' },
    { label: 'Visibility', value: `${((c.visibility || 10000) / 1000).toFixed(1)} km`, icon: '👁️', field: 'visibility' },
    { label: 'UV Index', value: `${c.uv_index ?? '--'}`, icon: '☀️', field: 'uv_index' },
    { label: 'Feels Like', value: `${convertTemp(c.apparent_temperature, unit)}${unitSymbol}`, icon: '🌡️', field: 'apparent_temperature' },
    { label: 'Dew Point', value: `${convertTemp(c.temperature_2m - ((100 - c.relative_humidity_2m) / 5), unit)}${unitSymbol}`, icon: '💦', field: 'apparent_temperature' },
  ]

  return (
    <AnimatedCard className="glass details-section" delay={0.1}>
      <h3>Weather Details</h3>
      <div className="details-grid">
        {details.map(d => (
          <div
            key={d.label}
            className="detail-card"
            onClick={() => onFieldClick(d.field, d.value)}
          >
            <span className="detail-card-icon">{d.icon}</span>
            <span className="detail-card-value">{d.value}</span>
            <span className="detail-card-label">{d.label}</span>
          </div>
        ))}
      </div>
    </AnimatedCard>
  )
}
