<div align="center">

<!-- Animated Weather SVG -->
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
    <style>
      @keyframes pulse { 0%,100% { r: 14px; } 50% { r: 16px; } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes drift { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @keyframes dot1 { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
      @keyframes dot2 { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
      @keyframes dot3 { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
      @keyframes barAnim { from { width: 0; } }
      @keyframes fillAnim { from { width: 0%; } }
      @keyframes glowPulse { 0%,100% { opacity: 0; } 50% { opacity: 0.15; } }
    </style>
  </defs>
  <circle cx="48" cy="38" r="15" fill="#facc15" opacity="0.9"><animate attributeName="r" values="15;17;15" dur="3s" repeatCount="indefinite"/></circle>
  <g stroke="#facc15" stroke-width="2" stroke-linecap="round" opacity="0.5">
    <line x1="48" y1="14" x2="48" y2="8"><animateTransform attributeName="transform" type="rotate" from="0 48 38" to="360 48 38" dur="10s" repeatCount="indefinite"/></line>
    <line x1="48" y1="62" x2="48" y2="68"><animateTransform attributeName="transform" type="rotate" from="0 48 38" to="360 48 38" dur="10s" repeatCount="indefinite"/></line>
    <line x1="24" y1="38" x2="18" y2="38"><animateTransform attributeName="transform" type="rotate" from="0 48 38" to="360 48 38" dur="10s" repeatCount="indefinite"/></line>
    <line x1="72" y1="38" x2="78" y2="38"><animateTransform attributeName="transform" type="rotate" from="0 48 38" to="360 48 38" dur="10s" repeatCount="indefinite"/></line>
  </g>
  <g fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="1">
    <ellipse cx="30" cy="62" rx="20" ry="13"><animate attributeName="cx" values="30;34;30" dur="6s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="50" cy="58" rx="16" ry="11"><animate attributeName="cx" values="50;54;50" dur="6s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="68" cy="64" rx="14" ry="9"><animate attributeName="cx" values="68;72;68" dur="6s" repeatCount="indefinite"/></ellipse>
  </g>
</svg>

<br/>

<h1 style="font-size: 2.5rem; font-weight: 700; margin: 8px 0; color: #60a5fa;">Weather Tracker</h1>

<p style="font-size: 1.05rem; color: #94a3b8; max-width: 500px; margin: 0 auto;">
  A beautiful, live weather dashboard with <strong style="color: #e2e8f0;">glassmorphism UI</strong>.
  Built with <strong style="color: #e2e8f0;">React</strong> + <strong style="color: #e2e8f0;">Vite</strong> · Powered by <strong style="color: #e2e8f0;">Open-Meteo</strong> · No API key required
</p>

<br/>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite"/>
  <img src="https://img.shields.io/badge/Free-No%20Key-22c55e?style=flat-square" alt="Free"/>
  <img src="https://img.shields.io/badge/license-MIT-94a3b8?style=flat-square" alt="License"/>
</p>

<!-- Animated divider dots -->
<svg width="60" height="10" viewBox="0 0 60 10">
  <circle cx="6" cy="5" r="3" fill="#60a5fa"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="0s" repeatCount="indefinite"/></circle>
  <circle cx="30" cy="5" r="3" fill="#a78bfa"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="0.3s" repeatCount="indefinite"/></circle>
  <circle cx="54" cy="5" r="3" fill="#f472b6"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="0.6s" repeatCount="indefinite"/></circle>
</svg>

</div>

<br/>

## ✨ Features

<table>
<tr>
  <td width="50%"><strong>🌤️ Live Weather</strong><br/><span style="color:#64748b;font-size:0.9rem;">Real-time data from Open-Meteo</span></td>
  <td width="50%"><strong>🔍 City Autocomplete</strong><br/><span style="color:#64748b;font-size:0.9rem;">Instant suggestions in 80ms</span></td>
</tr>
<tr>
  <td><strong>📍 Auto-detect</strong><br/><span style="color:#64748b;font-size:0.9rem;">Browser geolocation on load</span></td>
  <td><strong>🎨 Dynamic Background</strong><br/><span style="color:#64748b;font-size:0.9rem;">Gradient shifts with weather</span></td>
</tr>
<tr>
  <td><strong>🌙 Dark / Light Theme</strong><br/><span style="color:#64748b;font-size:0.9rem;">Persisted in localStorage</span></td>
  <td><strong>📊 8 Weather Details</strong><br/><span style="color:#64748b;font-size:0.9rem;">Humidity, wind, pressure, UV & more</span></td>
</tr>
<tr>
  <td><strong>⏳ 24‑Hour Forecast</strong><br/><span style="color:#64748b;font-size:0.9rem;">Smooth horizontal scroll</span></td>
  <td><strong>📅 7‑Day Forecast</strong><br/><span style="color:#64748b;font-size:0.9rem;">Clickable with temp bars</span></td>
</tr>
<tr>
  <td><strong>🌈 Highlights</strong><br/><span style="color:#64748b;font-size:0.9rem;">UV ring, sunrise/set, visibility</span></td>
  <td><strong>❄️ Particle Effects</strong><br/><span style="color:#64748b;font-size:0.9rem;">Rain, snow, fog, storm, sun glow</span></td>
</tr>
<tr>
  <td><strong>📱 Fully Responsive</strong><br/><span style="color:#64748b;font-size:0.9rem;">Desktop, tablet, mobile optimized</span></td>
  <td><strong>⚡ Offline Fallback</strong><br/><span style="color:#64748b;font-size:0.9rem;">Mock data when API is down</span></td>
</tr>
</table>

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 🚀 Quick Start

```bash
git clone https://github.com/kashyap-p/weather-tracker.git
cd weather-tracker
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build
npm run preview  # preview the build
```

<p style="color:#64748b;">Zero config. No API keys, no env vars, no setup.</p>

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 🧭 How It Works

```
User opens app
  ├─ 📍 Browser geolocation → reverse geocode → fetch weather
  └─ 🔍 Search city → geocode → fetch weather
       │
       ▼
  Render:
  ├─ CurrentWeather   — temp, icon, location, feels-like
  ├─ WeatherDetails   — 8‑card detail grid
  ├─ Highlights       — UV ring, sunrise/set, max/min
  ├─ HourlyForecast   — 24h scrollable
  └─ DailyForecast    — 7‑day clickable forecast
```

### APIs Used

| Service | Endpoint | Use |
|---------|----------|-----|
| Open-Meteo Geocoding | `/v1/search?name=...` | City autocomplete |
| Open-Meteo Weather | `/v1/forecast?lat=...` | All weather data |
| BigDataCloud | `reverse-geocode-client` | Coordinates → city name |

All are **free** and require **no API key**.

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 🗂️ Project Structure

```
src/
├── App.css                # All styles + CSS variables + responsive
├── App.jsx                # Root component
├── main.jsx               # Entry point
├── components/
│   ├── CurrentWeather.jsx
│   ├── DailyForecast.jsx
│   ├── ErrorBoundary.jsx
│   ├── Header.jsx
│   ├── Highlights.jsx
│   ├── HourlyForecast.jsx
│   ├── ParticleBackground.jsx
│   └── WeatherDetails.jsx
├── hooks/
│   └── useWeather.js
└── utils/
    ├── api.js
    ├── mock.js
    └── weatherCodes.js
```

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 🎨 Theming

| Mode | Background | Text | Glass |
|------|-----------|------|-------|
| 🌙 Dark | `#020617` | `#f1f5f9` | White tint 0.08 |
| ☀️ Light | `#f1f5f9` | `#334155` | White overlay 0.35 |

Dynamic background gradient blends **time of day**, **temperature**, and **weather code** in real-time.

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 🌐 Responsive Breakpoints

| Screen | Container | Section | Grid |
|--------|-----------|---------|------|
| ≥1024px | 20px pad | 22px pad | 3 columns |
| 768–1023px | 14px pad | 22px pad | 2 columns |
| 541–767px | 14px pad | 22px pad | 1 column |
| 421–540px | 6px pad | 12px pad | 1 column |
| 361–420px | 4px pad | 10px pad | 1 column |
| ≤360px | 3px pad | 6px pad | 1 column |

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 🛠️ Built With

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite"/>
  <img src="https://img.shields.io/badge/Open--Meteo-API-00BFFF?style=flat-square" alt="Open-Meteo"/>
  <img src="https://img.shields.io/badge/BigDataCloud-Geocode-6366f1?style=flat-square" alt="BigDataCloud"/>
  <img src="https://img.shields.io/badge/Inter-Font-94a3b8?style=flat-square" alt="Inter Font"/>
</p>

<br/>

<div align="center">
<svg width="160" height="3" viewBox="0 0 160 3">
  <rect width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
  <rect height="3" rx="1.5" fill="url(#g)"><animate attributeName="width" values="0;160;0" dur="4s" repeatCount="indefinite"/></rect>
</svg>
</div>

<br/>

## 📄 License

<p style="color:#64748b;">This project is open source. Feel free to use, modify, and distribute it.</p>

<br/>

---

<div align="center">
  <p style="color:#64748b;font-size:0.9rem;">Built with ❤️ using React + Vite · Data by <a href="https://open-meteo.com/" style="color:#60a5fa;">Open-Meteo</a></p>
  <br/>
  <a href="https://github.com/kashyap-p/weather-tracker" style="display:inline-block;padding:10px 28px;border-radius:20px;background:rgba(96,165,250,0.1);color:#a78bfa;font-weight:600;text-decoration:none;border:1px solid rgba(96,165,250,0.2);font-size:0.9rem;">View on GitHub</a>
</div>
