import { getWindDirection, convertTemp } from '../utils/weatherCodes'

export default function WeatherDetails({ data, unit }) {
  const c = data.current
  const unitSymbol = unit === 'F' ? '°F' : '°C'

  const details = [
    { label: 'Humidity', value: `${c.relative_humidity_2m}%`, icon: '💧' },
    { label: 'Wind', value: `${Math.round(c.wind_speed_10m)} km/h`, icon: '💨' },
    { label: 'Direction', value: getWindDirection(c.wind_direction_10m), icon: '🧭' },
    { label: 'Pressure', value: `${Math.round(c.surface_pressure || c.pressure_msl)} hPa`, icon: '🔽' },
    { label: 'Visibility', value: `${((c.visibility || 10000) / 1000).toFixed(1)} km`, icon: '👁️' },
    { label: 'UV Index', value: `${c.uv_index ?? '--'}`, icon: '☀️' },
    { label: 'Feels Like', value: `${convertTemp(c.apparent_temperature, unit)}${unitSymbol}`, icon: '🌡️' },
    { label: 'Dew Point', value: `${convertTemp(c.temperature_2m - ((100 - c.relative_humidity_2m) / 5), unit)}${unitSymbol}`, icon: '💦' },
  ]

  return (
    <section className="glass details-section">
      <h3>Weather Details</h3>
      <div className="details-grid">
        {details.map(d => (
          <div key={d.label} className="detail-card">
            <span className="detail-card-icon">{d.icon}</span>
            <span className="detail-card-value">{d.value}</span>
            <span className="detail-card-label">{d.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
