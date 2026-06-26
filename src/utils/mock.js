const MOCK = {
  latitude: 28.61, longitude: 77.23,
  current: {
    time: new Date().toISOString().slice(0, 16),
    temperature_2m: 33, relative_humidity_2m: 42, apparent_temperature: 35,
    weather_code: 0, wind_speed_10m: 12, wind_direction_10m: 270,
    pressure_msl: 1012, surface_pressure: 990, visibility: 10000, uv_index: 6,
  },
  hourly: {
    time: Array.from({length: 144}, (_, i) => {
      const d = new Date(); d.setHours(d.getHours() + i)
      return d.toISOString().slice(0, 16)
    }),
    temperature_2m: Array.from({length: 144}, () => 28 + Math.random() * 15),
    weather_code: Array.from({length: 144}, () => Math.floor(Math.random() * 4)),
    precipitation_probability: Array.from({length: 144}, () => Math.floor(Math.random() * 60)),
    uv_index: Array.from({length: 144}, () => Math.random() * 8),
    visibility: Array.from({length: 144}, () => 8000 + Math.random() * 8000),
  },
  daily: {
    time: Array.from({length: 7}, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i)
      return d.toISOString().slice(0, 10)
    }),
    weather_code: [0, 2, 1, 3, 0, 2, 1],
    temperature_2m_max: [35, 33, 34, 32, 36, 34, 33],
    temperature_2m_min: [26, 25, 26, 24, 27, 25, 24],
    precipitation_sum: [0, 0.5, 2, 0, 0, 1, 0],
    precipitation_probability_max: [5, 30, 60, 10, 5, 40, 10],
    sunrise: Array.from({length: 7}, () => '2026-06-26T05:25'),
    sunset: Array.from({length: 7}, () => '2026-06-26T19:22'),
    uv_index_max: [8, 7, 6, 5, 8, 7, 6],
    wind_speed_10m_max: [15, 12, 18, 10, 14, 16, 11],
    wind_direction_10m_dominant: [270, 250, 280, 260, 270, 255, 265],
  },
}

export default MOCK
