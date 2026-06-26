<div align="center">
  <br/>
  <img src="https://img.icons8.com/fluency/96/partly-cloudy-day.png" alt="Weather" width="80"/>
  <h1 align="center" style="margin-top: 0;">Weather Tracker</h1>
  <p align="center">
    <strong>A beautiful, live weather dashboard with glassmorphism UI</strong>
    <br/>
    Built with React + Vite · Powered by Open-Meteo API · No API key required
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React"/>
    <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/API-Open--Meteo-00BFFF" alt="API"/>
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License"/>
  </p>
  <br/>
</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌤️ **Live Weather** | Real-time data from Open-Meteo (free, no key) |
| 🔍 **City Autocomplete** | Search any city with instant suggestions (80ms debounce) |
| 📍 **Auto-detect Location** | Uses browser geolocation on first load |
| 🎨 **Dynamic Background** | Gradient changes with temperature, time of day & weather |
| 🌙 **Dark / Light Theme** | Toggle with preference saved to localStorage |
| 📊 **8 Weather Details** | Humidity, wind, pressure, visibility, UV, feels like, dew point |
| ⏳ **24‑Hour Forecast** | Scrollable hourly forecast with smooth arrows |
| 📅 **7‑Day Forecast** | Clickable days with temperature bars |
| 🌈 **Highlights Cards** | UV index ring, sunrise/set, visibility, max/min temps |
| ❄️ **Particle Effects** | Canvas particles: rain, snow, fog, storm, sun glow |
| 📱 **Fully Responsive** | Works on desktop, tablet, and mobile |
| ⚡ **Offline Fallback** | Mock data when API is unreachable |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/kashyap-p/weather-tracker.git

# Navigate into the project
cd weather-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

The build output is in the `dist/` folder — deploy it anywhere (Netlify, Vercel, GitHub Pages, etc.).

---

## 🖼️ Screenshots

<details>
<summary><strong>Dark Mode (default)</strong></summary>
<br/>
A sleek dark UI with glassmorphism cards and subtle blue accents. The background gradient shifts with the weather — warm oranges for hot days, cool blues for cold nights, and dramatic purples for thunderstorms.
</details>

<details>
<summary><strong>Light Mode</strong></summary>
<br/>
Clean light theme with muted slate text, soft gray backgrounds, and the same glassmorphism aesthetic. Perfect for daytime use.
</details>

<details>
<summary><strong>Mobile View</strong></summary>
<br/>
Fully responsive layout adapts to any screen size with optimized touch targets (≥38px) and a compact single-column layout.
</details>

---

## 🧭 How It Works

### Data Flow

```
User opens app
  ├─ Browser geolocation → reverse geocode → fetch weather
  └─ or search city → geocode → fetch weather
       │
       ▼
  Open-Meteo API returns current / hourly / daily data
       │
       ▼
  Render:
  ├─ CurrentWeather (main temp, icon, location)
  ├─ WeatherDetails (8‑card grid)
  ├─ Highlights (UV ring, sunrise/set, etc.)
  ├─ HourlyForecast (24h scroll)
  └─ DailyForecast (7‑day list with temp bars)
```

### APIs Used

| API | Endpoint | Usage |
|-----|----------|-------|
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) | `v1/search?name=...` | City search & autocomplete |
| [Open-Meteo Weather](https://open-meteo.com/en/docs) | `v1/forecast?latitude=...` | All weather data |
| [BigDataCloud](https://www.bigdatacloud.com/) | `reverse-geocode-client` | Reverse geocode coordinates |

All are **free** and require **no API key**.

---

## 🏗️ Project Structure

```
src/
├── App.css              # All styles with CSS variables & responsive breakpoints
├── App.jsx              # Root component: state, theme, gradient, layout
├── main.jsx             # Entry point (React 19 StrictMode)
├── components/
│   ├── CurrentWeather.jsx    # Temperature, icon, location, feels-like
│   ├── DailyForecast.jsx     # 7-day clickable forecast with temp bars
│   ├── ErrorBoundary.jsx     # Error fallback UI
│   ├── Header.jsx            # Search, autocomplete, theme/unit toggles
│   ├── Highlights.jsx        # UV ring, sunrise/set, visibility, max/min
│   ├── HourlyForecast.jsx    # 24h horizontal scrollable forecast
│   ├── ParticleBackground.jsx # Canvas particle system (rain/snow/fog/etc)
│   └── WeatherDetails.jsx    # 8-card detail grid
├── hooks/
│   └── useWeather.js     # State management, API calls, mock fallback
└── utils/
    ├── api.js            # fetchWeather, geocodeCity, searchCities, reverseGeocode
    ├── mock.js           # Hardcoded sample data for offline fallback
    └── weatherCodes.js   # Weather mapping, formatters, gradient generator
```

---

## 🎨 Theming

The app supports **dark** (default) and **light** modes. The preference is persisted in `localStorage('wt-theme')`.

- **Dark mode**: Deep navy background (`#020617`), bright text (`#f1f5f9`), glass with white tint
- **Light mode**: Soft gray background (`#f1f5f9`), slate text (`#334155`), glass with white overlay

The **dynamic background gradient** blends three factors:
1. **Time of day** — night (dark blue), day (blue sky), evening (purple/orange)
2. **Temperature** — warmer tones for hot weather, cooler tones for cold
3. **Weather code** — gray for overcast, white-blue for snow, dark for storms

---

## 🌐 Responsive Breakpoints

| Screen | Container | Section | Notes |
|--------|-----------|---------|-------|
| ≥1024px | 20px pad | 22px pad | 3‑column grid |
| 768–1023px | 14px pad | 22px pad | 2‑column grid |
| 541–767px | 14px pad | 22px pad | Single column |
| 421–540px | 6px pad | 12px pad | Compact mobile |
| 361–420px | 4px pad | 10px pad | iPhone 12 Pro / small phones |
| ≤360px | 3px pad | 6px pad | Very small screens |

---

## 🛠️ Built With

- [React 19](https://react.dev/) — UI framework
- [Vite 8](https://vitejs.dev/) — Build tool
- [Open-Meteo API](https://open-meteo.com/) — Weather data (free, no key)
- [BigDataCloud API](https://www.bigdatacloud.com/) — Reverse geocoding
- [Google Inter Font](https://fonts.google.com/specimen/Inter) — Typography

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.

---

<div align="center">
  <sub>Built with ❤️ using React + Vite · Data by <a href="https://open-meteo.com/">Open-Meteo</a></sub>
  <br/>
  <br/>
  <a href="https://github.com/kashyap-p/weather-tracker">
    <img src="https://img.shields.io/badge/View%20on-GitHub-181717?logo=github&logoColor=white" alt="GitHub"/>
  </a>
</div>
