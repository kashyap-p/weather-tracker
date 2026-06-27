# Weather Tracker 3D

A live weather dashboard with **3D particle effects**, **liquid glass UI**, and **auto weather notifications**. Built with **React 19** + **Vite 8**. Powered by the free **Open-Meteo API** — no API key required.

---

## Features

| | | |
|---|---|---|
| 🌤️ Live Weather | 🔍 City Autocomplete | 📍 Auto-detect Location |
| 🎨 Dynamic Background | 🌙 Dark / Light Theme | 📊 8 Weather Details |
| ⏳ 24‑Hour Forecast | 📅 7‑Day Forecast | 🌈 Highlights Cards |
| 🎯 3D Particle Effects | 📱 Fully Responsive | ⚡ Offline Fallback |
| 🔔 Auto Weather Alerts | 🖱️ Clickable Data Modals | 🧊 Liquid Glass UI |

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

## What's New

- **3D Weather Particles** — animated sun glow, rain streaks, snowflakes, storm particles, fog, and clouds rendered on a canvas layer based on weather conditions
- **Liquid Glass UI** — frosted glass cards with animated shine overlays, blur effects, and morphing transitions
- **Clickable Data** — tap any weather metric to see an educational modal explaining what it means
- **Auto Notifications** — browser notifications for severe weather (storms, extreme heat, heavy rain, high UV, strong winds)
- **Framer Motion** — spring animations, staggered list reveals, hover/tap micro-interactions throughout
- **iPhone Optimized** — `viewport-fit=cover`, safe areas, responsive down to 360px (iPhone SE)

---

## How It Works

```
User opens app
  ├─ Browser geolocation → reverse geocode → fetch weather
  ├─ Search city → geocode → fetch weather
  └─ Bad weather detected → browser notification
       │
       ▼
  Render:
  ├─ Scene3D           — weather-specific particle canvas (sun/rain/snow/storm)
  ├─ CurrentWeather    — temp, icon, location, feels-like (clickable)
  ├─ WeatherDetails    — 8‑card detail grid (clickable)
  ├─ Highlights        — UV ring, sunrise/set, max/min (clickable)
  ├─ HourlyForecast    — 24h scrollable (clickable)
  └─ DailyForecast     — 7‑day clickable forecast (clickable)
```

### APIs Used

| Service | Endpoint | Purpose |
|---------|----------|---------|
| Open-Meteo Geocoding | `/v1/search?name=...` | City autocomplete |
| Open-Meteo Weather | `/v1/forecast?lat=...` | All weather data |
| BigDataCloud | `reverse-geocode-client` | Coordinates → city name |

All are **free** and require **no API key**.

---

## Auto Notifications

The app monitors weather data and sends browser notifications for:

| Condition | Alert |
|---|---|
| Thunderstorm (code 95-99) | ⛈️ Seek shelter |
| Heavy rain / snow | 🌧️ Umbrella / travel caution |
| Extreme heat ≥40°C | 🔥 Stay hydrated |
| Freezing ≤0°C | 🥶 Bundle up |
| UV index 6+ | ☀️ Sun protection advised |
| Wind ≥30 km/h | 💨 Windy conditions |
| Rain chance 80%+ | 🌧️ High rain probability |

Notifications are deduplicated per day via localStorage.

---

## Project Structure

```
src/
├── App.css                   # All styles + CSS variables + responsive
├── App.jsx                   # Root component
├── main.jsx                  # Entry point (React 19 StrictMode)
├── components/
│   ├── AnimatedCard.jsx      # Framer Motion glass card wrapper
│   ├── CurrentWeather.jsx    # Current conditions (clickable)
│   ├── DailyForecast.jsx     # 7-day forecast (clickable)
│   ├── DataModal.jsx         # Educational info popup
│   ├── ErrorBoundary.jsx     # Error boundary with retry
│   ├── Header.jsx            # Search bar, theme/unit toggles
│   ├── Highlights.jsx        # UV, sunrise, visibility, max temp
│   ├── HourlyForecast.jsx    # 24-hour scrollable (clickable)
│   ├── Scene3D.jsx           # Weather particle canvas
│   └── WeatherDetails.jsx    # 8-card detail grid (clickable)
├── hooks/
│   ├── useNotifications.js   # Weather alert notifications
│   └── useWeather.js         # Weather data fetching
└── utils/
    ├── api.js                # Open-Meteo API wrappers
    ├── mock.js               # Fallback mock data
    └── weatherCodes.js       # WMO code mapping + helpers
```

---

## Theming

| Mode | Background | Text | Glass |
|------|-----------|------|-------|
| 🌙 **Dark** | `#020617` | `#f1f5f9` | White tint 0.08 |
| ☀️ **Light** | `#f1f5f9` | `#334155` | White overlay 0.30 |

The dynamic background gradient blends **time of day**, **temperature**, and **weather code** in real-time.

---

## Responsive Breakpoints

| Screen | Container | Section | Layout |
|--------|-----------|---------|--------|
| ≥1024px | 20px pad | 22px pad | 3‑column grid |
| 768–1023px | 14px pad | 22px pad | 2‑column grid |
| 541–767px | 14px pad | 22px pad | 1 column |
| 421–540px (iPhone) | 6px pad | 12px pad | 1 column |
| 361–420px | 4px pad | 10px pad | 1 column |
| ≤360px (iPhone SE) | 3px pad | 6px pad | 1 column |

---

## Built With

- [React](https://react.dev/) 19 — UI framework
- [Vite](https://vitejs.dev/) 8 — Build tool
- [Framer Motion](https://www.framer.com/motion/) 11 — Animations
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
