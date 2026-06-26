# Weather Tracker

A live weather dashboard with glassmorphism UI, built with **React** + **Vite**. Powered by the free **Open-Meteo API** — no API key required.

---

## Features

| | | |
|---|---|---|
| 🌤️ Live Weather | 🔍 City Autocomplete | 📍 Auto-detect Location |
| 🎨 Dynamic Background | 🌙 Dark / Light Theme | 📊 8 Weather Details |
| ⏳ 24‑Hour Forecast | 📅 7‑Day Forecast | 🌈 Highlights Cards |
| ❄️ Particle Effects | 📱 Fully Responsive | ⚡ Offline Fallback |

---

## Quick Start

```bash
git clone https://github.com/kashyap-p/weather-tracker.git
cd weather-tracker
npm install
npm run dev        # → http://localhost:5173
npm run build      # production build
npm run preview    # preview build
```

**Zero configuration.** No API keys, no environment variables, no setup.

---

## How It Works

```
User opens app
  ├─ Browser geolocation → reverse geocode → fetch weather
  └─ Search city → geocode → fetch weather
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

| Service | Endpoint | Purpose |
|---------|----------|---------|
| Open-Meteo Geocoding | `/v1/search?name=...` | City autocomplete |
| Open-Meteo Weather | `/v1/forecast?lat=...` | All weather data |
| BigDataCloud | `reverse-geocode-client` | Coordinates → city name |

All are **free** and require **no API key**.

---

## Project Structure

```
src/
├── App.css                # All styles + CSS variables + responsive
├── App.jsx                # Root component
├── main.jsx               # Entry point (React 19 StrictMode)
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

---

## Theming

| Mode | Background | Text | Glass |
|------|-----------|------|-------|
| 🌙 **Dark** | `#020617` | `#f1f5f9` | White tint 0.08 |
| ☀️ **Light** | `#f1f5f9` | `#334155` | White overlay 0.35 |

The dynamic background gradient blends **time of day**, **temperature**, and **weather code** in real-time.

---

## Responsive Breakpoints

| Screen | Container | Section | Layout |
|--------|-----------|---------|--------|
| ≥1024px | 20px pad | 22px pad | 3‑column grid |
| 768–1023px | 14px pad | 22px pad | 2‑column grid |
| 541–767px | 14px pad | 22px pad | 1 column |
| 421–540px | 6px pad | 12px pad | 1 column |
| 361–420px | 4px pad | 10px pad | 1 column |
| ≤360px | 3px pad | 6px pad | 1 column |

---

## Built With

- [React](https://react.dev/) 19 — UI framework
- [Vite](https://vitejs.dev/) 8 — Build tool
- [Open-Meteo API](https://open-meteo.com/) — Weather data
- [BigDataCloud API](https://www.bigdatacloud.com/) — Reverse geocoding
- [Inter Font](https://fonts.google.com/specimen/Inter) — Typography

---

## License

This project is open source. Feel free to use, modify, and distribute it.

---

<p align="center">
  Built with ❤️ using React + Vite · Data by <a href="https://open-meteo.com/">Open-Meteo</a>
</p>
