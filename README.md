<div align="center">

<!-- Animated Weather SVG -->
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#a78bfa"/>
      <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="8s" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  <!-- Sun -->
  <circle cx="60" cy="45" r="18" fill="#facc15" opacity="0.9">
    <animate attributeName="r" values="18;20;18" dur="3s" repeatCount="indefinite"/>
  </circle>
  <!-- Sun rays -->
  <g stroke="#facc15" stroke-width="2.5" stroke-linecap="round" opacity="0.6">
    <line x1="60" y1="18" x2="60" y2="12"><animateTransform attributeName="transform" type="rotate" from="0 60 45" to="360 60 45" dur="12s" repeatCount="indefinite"/></line>
    <line x1="60" y1="72" x2="60" y2="78"><animateTransform attributeName="transform" type="rotate" from="0 60 45" to="360 60 45" dur="12s" repeatCount="indefinite"/></line>
    <line x1="33" y1="45" x2="27" y2="45"><animateTransform attributeName="transform" type="rotate" from="0 60 45" to="360 60 45" dur="12s" repeatCount="indefinite"/></line>
    <line x1="87" y1="45" x2="93" y2="45"><animateTransform attributeName="transform" type="rotate" from="0 60 45" to="360 60 45" dur="12s" repeatCount="indefinite"/></line>
  </g>
  <!-- Cloud -->
  <g fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1">
    <ellipse cx="42" cy="70" rx="22" ry="14">
      <animate attributeName="cx" values="42;46;42" dur="6s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="62" cy="66" rx="18" ry="12">
      <animate attributeName="cx" values="62;66;62" dur="6s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="80" cy="72" rx="16" ry="10">
      <animate attributeName="cx" values="80;84;80" dur="6s" repeatCount="indefinite"/>
    </ellipse>
    <rect x="36" y="60" width="46" height="12" rx="6" fill="rgba(255,255,255,0.15)">
      <animate attributeName="x" values="36;40;36" dur="6s" repeatCount="indefinite"/>
    </rect>
  </g>
</svg>

<br/>

<!-- Animated Title -->
<h1 style="font-size: 2.6rem; font-weight: 700; margin: 4px 0; background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6, #60a5fa); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shift 4s ease-in-out infinite;">
  Weather Tracker
</h1>

<style>
@keyframes shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes barFill {
  from { width: 0%; }
}
@keyframes countUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.anim-fade { animation: fadeSlide 0.6s ease-out both; }
.anim-fade-1 { animation: fadeSlide 0.6s ease-out 0.1s both; }
.anim-fade-2 { animation: fadeSlide 0.6s ease-out 0.2s both; }
.anim-fade-3 { animation: fadeSlide 0.6s ease-out 0.3s both; }
.anim-fade-4 { animation: fadeSlide 0.6s ease-out 0.4s both; }
.anim-pulse { animation: pulse 2s ease-in-out infinite; }
.anim-float { animation: float 3s ease-in-out infinite; }
.bar { height: 8px; background: rgba(96,165,250,0.15); border-radius: 4px; overflow: hidden; margin: 6px 0; }
.bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #60a5fa, #a78bfa); animation: barFill 1.2s ease-out both; }
.tag { display: inline-block; padding: 4px 14px; margin: 3px; border-radius: 20px; font-size: 0.82rem; font-weight: 500; background: rgba(96,165,250,0.12); color: #60a5fa; border: 1px solid rgba(96,165,250,0.2); transition: all 0.3s; }
</style>

<br/>
<p class="anim-fade" style="font-size: 1.05rem; color: rgba(255,255,255,0.75); max-width: 520px; margin: 0 auto;">
  A beautiful, live weather dashboard with <strong style="color: #fff;">glassmorphism UI</strong>.<br/>
  Built with <strong>React</strong> + <strong>Vite</strong> · Powered by <strong>Open-Meteo</strong> · No API key required
</p>

<br/>

<!-- Badges -->
<p>
  <span class="tag anim-fade-1">⚛️ React 19</span>
  <span class="tag anim-fade-1">⚡ Vite 8</span>
  <span class="tag anim-fade-1">🌐 Open-Meteo API</span>
  <span class="tag anim-fade-2">🎨 Glassmorphism</span>
  <span class="tag anim-fade-2">🌙 Dark / Light</span>
  <span class="tag anim-fade-2">📱 Responsive</span>
  <span class="tag anim-fade-3">❄️ Particle Effects</span>
  <span class="tag anim-fade-3">📍 Geo-location</span>
  <span class="tag anim-fade-3">🎯 Free · No Key</span>
</p>

<br/>

<!-- Divider -->
<svg width="60" height="12" viewBox="0 0 60 12">
  <circle cx="6" cy="6" r="4" fill="#60a5fa" opacity="0.6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="0s" repeatCount="indefinite"/></circle>
  <circle cx="30" cy="6" r="4" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="0.3s" repeatCount="indefinite"/></circle>
  <circle cx="54" cy="6" r="4" fill="#f472b6" opacity="0.6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="0.6s" repeatCount="indefinite"/></circle>
</svg>

</div>

<br/>

## ✨ Features

<div class="anim-fade-1">

<table>
<tr>
  <td width="50%">
    <strong>🌤️ Live Weather</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Real-time data from Open-Meteo</span>
    <div class="bar"><div class="bar-fill" style="width: 100%; animation-delay: 0.1s;"></div></div>
  </td>
  <td width="50%">
    <strong>🔍 City Autocomplete</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Instant suggestions with 80ms debounce</span>
    <div class="bar"><div class="bar-fill" style="width: 95%; animation-delay: 0.15s;"></div></div>
  </td>
</tr>
<tr>
  <td>
    <strong>📍 Auto-detect Location</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Browser geolocation on first load</span>
    <div class="bar"><div class="bar-fill" style="width: 90%; animation-delay: 0.2s;"></div></div>
  </td>
  <td>
    <strong>🎨 Dynamic Background</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Gradient shifts with temp, time & weather</span>
    <div class="bar"><div class="bar-fill" style="width: 95%; animation-delay: 0.25s;"></div></div>
  </td>
</tr>
<tr>
  <td>
    <strong>🌙 Dark / Light Theme</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Persisted in localStorage</span>
    <div class="bar"><div class="bar-fill" style="width: 100%; animation-delay: 0.3s;"></div></div>
  </td>
  <td>
    <strong>📊 8 Weather Details</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Humidity, wind, pressure, UV, feels-like & more</span>
    <div class="bar"><div class="bar-fill" style="width: 85%; animation-delay: 0.35s;"></div></div>
  </td>
</tr>
<tr>
  <td>
    <strong>⏳ 24‑Hour Forecast</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Smooth horizontal scroll</span>
    <div class="bar"><div class="bar-fill" style="width: 85%; animation-delay: 0.4s;"></div></div>
  </td>
  <td>
    <strong>📅 7‑Day Forecast</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Clickable with temp bars</span>
    <div class="bar"><div class="bar-fill" style="width: 90%; animation-delay: 0.45s;"></div></div>
  </td>
</tr>
<tr>
  <td>
    <strong>🌈 Highlights</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">UV ring, sunrise/set, visibility, max/min</span>
    <div class="bar"><div class="bar-fill" style="width: 95%; animation-delay: 0.5s;"></div></div>
  </td>
  <td>
    <strong>❄️ Particle Effects</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Rain, snow, fog, storm, sun glow</span>
    <div class="bar"><div class="bar-fill" style="width: 80%; animation-delay: 0.55s;"></div></div>
  </td>
</tr>
<tr>
  <td>
    <strong>📱 Fully Responsive</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Desktop, tablet, mobile — all optimized</span>
    <div class="bar"><div class="bar-fill" style="width: 100%; animation-delay: 0.6s;"></div></div>
  </td>
  <td>
    <strong>⚡ Offline Fallback</strong><br/>
    <span style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Mock data when API is unreachable</span>
    <div class="bar"><div class="bar-fill" style="width: 90%; animation-delay: 0.65s;"></div></div>
  </td>
</tr>
</table>

</div>

<br/>

<div align="center">

<!-- Animated Divider -->
<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 🚀 Quick Start

<div class="anim-fade-2">

```bash
# Clone & install
git clone https://github.com/kashyap-p/weather-tracker.git
cd weather-tracker
npm install

# Start dev server (opens at http://localhost:5173)
npm run dev

# Production build
npm run build
npm run preview
```

</div>

**Zero configuration required.** No API keys, no environment variables, no setup.

<br/>

<div align="center">

<!-- Divider -->
<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 🧭 Architecture

<pre style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; font-size: 0.85rem; line-height: 1.7;">
User opens app
  ├─ 📍 Browser geolocation
  │    └─ Reverse geocode (BigDataCloud)
  │         └─ Fetch weather (Open-Meteo)
  ├─ 🔍 Search city
  │    └─ Geocode (Open-Meteo)
  │         └─ Fetch weather (Open-Meteo)
  │
  └─ 📊 Render
       ├─ <span style="color: #60a5fa;">CurrentWeather</span>   — Main temp, icon, feels-like
       ├─ <span style="color: #60a5fa;">WeatherDetails</span>  — 8‑card detail grid
       ├─ <span style="color: #60a5fa;">Highlights</span>       — UV ring, sunrise/set, etc.
       ├─ <span style="color: #60a5fa;">HourlyForecast</span>   — 24h scrollable
       └─ <span style="color: #60a5fa;">DailyForecast</span>    — 7‑day clickable list
</pre>

### APIs Used (all free, no key)

| Service | Endpoint | Purpose |
|---------|----------|---------|
| Open-Meteo Geocoding | `/v1/search?name=...` | City autocomplete |
| Open-Meteo Weather | `/v1/forecast?lat=...` | All weather data |
| BigDataCloud | `reverse-geocode-client` | Coordinate → city name |

<br/>

<div align="center">

<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 🗂️ Project Structure

<pre style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; font-size: 0.85rem; line-height: 1.7;">
<span style="color: #facc15;">src/</span>
├── <span style="color: #60a5fa;">App.css</span>               # All styles + CSS variables + responsive
├── <span style="color: #60a5fa;">App.jsx</span>               # Root: state, theme, gradient, layout
├── <span style="color: #60a5fa;">main.jsx</span>              # Entry point (React 19 StrictMode)
├── <span style="color: #a78bfa;">components/</span>
│   ├── <span style="color: #60a5fa;">CurrentWeather.jsx</span>
│   ├── <span style="color: #60a5fa;">DailyForecast.jsx</span>
│   ├── <span style="color: #60a5fa;">ErrorBoundary.jsx</span>
│   ├── <span style="color: #60a5fa;">Header.jsx</span>
│   ├── <span style="color: #60a5fa;">Highlights.jsx</span>
│   ├── <span style="color: #60a5fa;">HourlyForecast.jsx</span>
│   ├── <span style="color: #60a5fa;">ParticleBackground.jsx</span>
│   └── <span style="color: #60a5fa;">WeatherDetails.jsx</span>
├── <span style="color: #a78bfa;">hooks/</span>
│   └── <span style="color: #60a5fa;">useWeather.js</span>
└── <span style="color: #a78bfa;">utils/</span>
    ├── <span style="color: #60a5fa;">api.js</span>
    ├── <span style="color: #60a5fa;">mock.js</span>
    └── <span style="color: #60a5fa;">weatherCodes.js</span>
</pre>

<br/>

<div align="center">

<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 🎨 Theming

| Mode | Background | Text | Glass |
|------|-----------|------|-------|
| 🌙 **Dark** | `#020617` | `#f1f5f9` | White tint `0.08` |
| ☀️ **Light** | `#f1f5f9` | `#334155` | White overlay `0.35` |

The **dynamic gradient** blends three factors in real-time:
- ⏰ **Time of day** — night (deep blue), day (sky blue), evening (purple/orange)
- 🌡️ **Temperature** — warm tones for hot, cool tones for cold
- 🌦️ **Weather code** — gray (overcast), white-blue (snow), dark (storms)

<br/>

<div align="center">

<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 🌐 Responsive Breakpoints

<div class="anim-fade-3">

| Screen | Container | Section | Layout |
|--------|-----------|---------|--------|
| ≥1024px | 20px | 22px | 3‑column grid |
| 768–1023px | 14px | 22px | 2‑column grid |
| 541–767px | 14px | 22px | Single column |
| 421–540px | 6px | 12px | Compact mobile |
| 361–420px | 4px | 10px | iPhone 12 Pro |
| ≤360px | 3px | 6px | Small screens |

</div>

<br/>

<div align="center">

<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 🛠️ Built With

<p>
  <span class="tag anim-fade-4">⚛️ React 19</span>
  <span class="tag anim-fade-4">⚡ Vite 8</span>
  <span class="tag anim-fade-4">🌐 Open-Meteo API</span>
  <span class="tag anim-fade-4">🗺️ BigDataCloud API</span>
  <span class="tag anim-fade-4">🔤 Inter Font</span>
</p>

<br/>

<div align="center">

<svg width="200" height="3" viewBox="0 0 200 3">
  <rect x="0" y="0" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" height="3" rx="1.5" fill="url(#sg)">
    <animate attributeName="width" values="0;200;0" dur="4s" repeatCount="indefinite"/>
  </rect>
</svg>

</div>

<br/>

## 📄 License

<p style="color: rgba(255,255,255,0.6);">
  This project is open source. Feel free to use, modify, and distribute it.
</p>

<br/>

---

<div align="center">

<svg width="160" height="40" viewBox="0 0 160 40">
  <text x="80" y="22" text-anchor="middle" font-family="system-ui" font-size="11" fill="rgba(255,255,255,0.4)">
    Built with ❤️ using React + Vite
  </text>
  <text x="80" y="36" text-anchor="middle" font-family="system-ui" font-size="10" fill="rgba(255,255,255,0.25)">
    Data by Open-Meteo
  </text>
  <text x="80" y="22" text-anchor="middle" font-family="system-ui" font-size="11" fill="rgba(255,255,255,0.4)" opacity="0">
    Built with ❤️ using React + Vite
    <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" begin="1s"/>
  </text>
  <text x="80" y="36" text-anchor="middle" font-family="system-ui" font-size="10" fill="rgba(255,255,255,0.25)" opacity="0">
    Data by Open-Meteo
    <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" begin="1s"/>
  </text>
</svg>

<br/>
<br/>

<a href="https://github.com/kashyap-p/weather-tracker">
  <svg width="180" height="38" viewBox="0 0 180 38">
    <rect x="0" y="0" width="180" height="38" rx="19" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="90" y="23" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="600" fill="#a78bfa">View on GitHub</text>
    <rect x="0" y="0" width="180" height="38" rx="19" fill="rgba(96,165,250,0.15)" opacity="0">
      <animate attributeName="opacity" values="0;0;0.15;0" dur="3s" repeatCount="indefinite"/>
    </rect>
  </svg>
</a>

</div>
