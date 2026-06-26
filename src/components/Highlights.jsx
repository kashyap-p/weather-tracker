import { formatTime, convertTemp } from '../utils/weatherCodes'

export default function Highlights({ data, unit }) {
  const c = data.current
  const d = data.daily
  const unitSymbol = unit === 'F' ? '°F' : '°C'

  function getUVLevel(uv) {
    if (uv == null) return { label: '--', color: '#888' }
    if (uv <= 2) return { label: 'Low', color: '#4ade80' }
    if (uv <= 5) return { label: 'Moderate', color: '#facc15' }
    if (uv <= 7) return { label: 'High', color: '#fb923c' }
    if (uv <= 10) return { label: 'Very High', color: '#ef4444' }
    return { label: 'Extreme', color: '#a855f7' }
  }

  const uvInfo = getUVLevel(c.uv_index ?? d.uv_index_max?.[0])

  const highlights = [
    {
      label: 'UV Index',
      value: `${c.uv_index ?? d.uv_index_max?.[0] ?? '--'}`,
      sub: uvInfo.label,
      color: uvInfo.color,
      type: 'uv',
    },
    {
      label: 'Sunrise',
      value: formatTime(d.sunrise[0]),
      sub: 'Sunset ' + formatTime(d.sunset[0]),
      icon: '🌅',
    },
    {
      label: 'Visibility',
      value: `${((c.visibility || 10000) / 1000).toFixed(1)} km`,
      sub: c.visibility >= 8000 ? 'Good' : c.visibility >= 4000 ? 'Moderate' : 'Poor',
      icon: '👁️',
    },
    {
      label: 'Max Temp',
      value: `${convertTemp(d.temperature_2m_max[0], unit)}${unitSymbol}`,
      sub: `Min ${convertTemp(d.temperature_2m_min[0], unit)}${unitSymbol}`,
      icon: '🌡️',
    },
  ]

  return (
    <section className="glass highlights-section">
      <h3>Today's Highlights</h3>
      <div className="highlights-grid">
        {highlights.map((h, i) => (
          <div key={i} className="highlight-card">
            {h.type === 'uv' ? (
              <>
                <div className="highlight-uv-ring" style={{ background: `conic-gradient(${uvInfo.color} ${Math.min((c.uv_index ?? 0) / 11 * 360, 360)}deg, rgba(255,255,255,0.06) 0deg)` }}>
                  <span>{h.value}</span>
                </div>
                <span className="highlight-label">{h.label}</span>
                <span className="highlight-sub" style={{ color: h.color }}>{h.sub}</span>
              </>
            ) : (
              <>
                <span className="highlight-icon">{h.icon}</span>
                <span className="highlight-value">{h.value}</span>
                <span className="highlight-label">{h.label}</span>
                <span className="highlight-sub">{h.sub}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
