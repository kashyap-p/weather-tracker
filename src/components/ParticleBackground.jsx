import { useEffect, useRef } from 'react'

const CONFIGS = {
  rain: { count: 120, size: [1.5, 2], speedY: [6, 8], speedX: [0, 0], draw: 'rain' },
  snow: { count: 80, size: [2, 4], speedY: [1, 2], speedX: [-0.3, 0.3], draw: 'snow' },
  storm: { count: 100, size: [1.5, 2], speedY: [0.3, 0.5], speedX: [-0.2, 0.2], draw: 'storm' },
  sun: { count: 40, size: [1.5, 2], speedY: [0.3, 0.5], speedX: [-0.2, 0.2], draw: 'glow' },
  cloud: { count: 40, size: [1.5, 2], speedY: [0.3, 0.5], speedX: [-0.2, 0.2], draw: 'glow' },
  fog: { count: 40, size: [1.5, 2], speedY: [0.3, 0.5], speedX: [-0.2, 0.2], draw: 'fog' },
}

export default function ParticleBackground({ type = 'sun' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cfg = CONFIGS[type] || CONFIGS.sun
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
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = rand(cfg.size[0], cfg.size[1])
        this.speedY = rand(cfg.speedY[0], cfg.speedY[1])
        this.speedX = rand(cfg.speedX[0], cfg.speedX[1])
        this.opacity = 0.3 + Math.random() * 0.5
        this.wobble = Math.random() * Math.PI * 2
      }
      update() {
        if (type === 'snow') {
          this.wobble += 0.02
          this.x += Math.sin(this.wobble) * 0.5
        }
        this.x += this.speedX
        this.y += this.speedY
        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) this.reset()
      }
      draw() {
        ctx.beginPath()
        switch (cfg.draw) {
          case 'rain':
            ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`
            ctx.lineWidth = 1.5
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x - 4, this.y + 12)
            ctx.stroke()
            break
          case 'snow':
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'glow':
            ctx.fillStyle = `rgba(255, 255, 200, ${this.opacity * 0.3})`
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'fog':
            ctx.fillStyle = `rgba(200, 200, 220, ${this.opacity * 0.15})`
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'storm':
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.4})`
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
            break
        }
      }
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
  }, [type])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
