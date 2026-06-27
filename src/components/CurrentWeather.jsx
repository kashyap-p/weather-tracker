import { getWeatherInfo, convertTemp } from '../utils/weatherCodes'
import AnimatedCard from './AnimatedCard'

export default function CurrentWeather({ data, location, unit, onFieldClick }) {
  const c = data.current
  const info = getWeatherInfo(c.weather_code)
  const temp = convertTemp(c.temperature_2m, unit)
  const feels = convertTemp(c.apparent_temperature, unit)
  const unitSymbol = unit === 'F' ? '°F' : '°C'

  return (
    <AnimatedCard className="glass current-weather">
      <div className="cw-location">
        <h2>{location.name || 'Current Location'}</h2>
        {location.country && <p>{location.admin ? `${location.admin}, ${location.country}` : location.country}</p>}
      </div>
      <div
        className="cw-main"
        onClick={() => onFieldClick('temperature_2m', `${c.temperature_2m}${unitSymbol}`)}
        style={{ cursor: 'pointer' }}
      >
        <span className="cw-icon">{info.icon}</span>
        <div className="cw-temp-group">
          <span className="cw-temp">{temp}</span>
          <span className="cw-temp-unit">{unitSymbol}</span>
        </div>
      </div>
      <p
        className="cw-desc"
        onClick={() => onFieldClick('weather_code', info.desc)}
        style={{ cursor: 'pointer' }}
      >{info.desc}</p>
      <p
        className="cw-feels"
        onClick={() => onFieldClick('apparent_temperature', `${feels}${unitSymbol}`)}
        style={{ cursor: 'pointer' }}
      >Feels like {feels}{unitSymbol}</p>
      <div className="cw-bar">
        <div className="cw-bar-fill" style={{ width: `${Math.min(100, ((c.temperature_2m + 10) / 50) * 100)}%` }} />
      </div>
    </AnimatedCard>
  )
}
