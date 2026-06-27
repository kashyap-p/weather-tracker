import { useEffect, useRef } from 'react'

const CONFIGS = {
  sun: { count: 60, color: '#fbbf24', size: 2, speed: 0.3, spread: 4 },
  cloud: { count: 40, color: '#94a3b8', size: 3, speed: 0.15, spread: 5 },
  rain: { count: 150, color: '#60a5fa', size: 1.5, speed: 2, spread: 5 },
  snow: { count: 100, color: '#ffffff', size: 2.5, speed: 0.5, spread: 5 },
  storm: { count: 120, color: '#a855f7', size: 2, speed: 0.8, spread: 6 },
  fog: { count: 80, color: '#cbd5e1', size: 4, speed: 0.1, spread: 6 },
}

function getWeatherConfig(code) {
  if (code >= 95) return CONFIGS.storm
  if (code >= 71 && code <= 86) return CONFIGS.snow
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return CONFIGS.rain
  if (code >= 45 && code <= 48) return CONFIGS.fog
  if (code >= 2 && code <= 3) return CONFIGS.cloud
  return CONFIGS.sun
}

export default function Scene3D({ weatherCode = 0 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cfg = getWeatherConfig(weatherCode)
    let particles = []
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function rand(a, b) { return a + Math.random() * (b - a) }

    class Particle {
      constructor() {
        this.reset()
        this.z = rand(0.3, 1)
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = rand(cfg.size * 0.5, cfg.size * 1.5)
        this.speed = rand(cfg.speed * 0.5, cfg.speed * 1.5)
        this.opacity = rand(0.2, 0.6)
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = rand(0.01, 0.03)
      }
      update() {
        const isRain = weatherCode >= 51 && weatherCode <= 82
        const isSnow = weatherCode >= 71 && weatherCode <= 86
        const isStorm = weatherCode >= 95

        if (isSnow || isCloudyLike()) {
          this.wobble += this.wobbleSpeed
          this.x += Math.sin(this.wobble) * 0.8
        }
        if (isStorm) {
          this.x += Math.sin(this.wobble) * 1.5
        }

        this.y += this.speed * (isRain ? 1.5 : isStorm ? 1.2 : 0.3)
        this.x += Math.sin(Date.now() * 0.001) * 0.1

        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset()
          this.y = -10
        }
      }
      draw() {
        const isRain = (weatherCode >= 51 && weatherCode <= 57) || (weatherCode >= 61 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)
        const isSnow = (weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)
        const isStorm = weatherCode >= 95

        ctx.save()
        if (isRain) {
          ctx.strokeStyle = `rgba(96, 165, 250, ${this.opacity * 0.6})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(this.x - 3, this.y + 8)
          ctx.stroke()
        } else if (isSnow) {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.7})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2)
          ctx.fill()
        } else if (isStorm) {
          ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity * 0.3})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
          gradient.addColorStop(0, cfg.color)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 2 * this.z, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
    }

    function isCloudyLike() {
      return weatherCode >= 2 && weatherCode <= 3
    }

    particles = Array.from({ length: cfg.count }, () => new Particle())

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [weatherCode])

  return <canvas ref={canvasRef} className="scene-3d-canvas" />
}
