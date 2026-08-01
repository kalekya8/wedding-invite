import { Injectable } from '@angular/core';

interface ParticleConfig {
  type: 'cherry' | 'white' | 'sage' | 'gold' | 'ivory';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationVelocity: number;
  opacity: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: ParticleConfig[] = [];
  private animationId: number | null = null;
  private startTime: number = 0;
  private duration: number = 0;
  private isRunning: boolean = false;

  private readonly colors = {
    cherry: '#F7C7D3',
    white: '#FFF9F2',
    sage: '#9AA68A',
    gold: '#C8A24D',
    ivory: '#F7F2E8'
  };

  private readonly distribution = {
    cherry: 0.30,
    white: 0.25,
    sage: 0.20,
    gold: 0.15,
    ivory: 0.10
  };

  constructor() {
    this.createCanvas();
  }

  private createCanvas() {
    if (typeof document === 'undefined') return;

    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    this.updateCanvasSize();

    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    window.addEventListener('resize', () => this.updateCanvasSize());
  }

  private updateCanvasSize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private getParticleCount(): number {
    const width = window.innerWidth;

    if (width < 768) {
      return this.getRandomInt(70, 100);
    } else if (width < 1024) {
      return this.getRandomInt(120, 150);
    } else {
      return this.getRandomInt(180, 220);
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomType(): keyof typeof this.distribution {
    const rand = Math.random();
    let cumulative = 0;

    for (const [type, percentage] of Object.entries(this.distribution)) {
      cumulative += percentage;
      if (rand <= cumulative) {
        return type as keyof typeof this.distribution;
      }
    }

    return 'cherry';
  }

  private createParticles(centerX: number, centerY: number, count: number) {
    console.log(`[${new Date().getTime()}] 🎨 Creating ${count} particles from (${centerX}, ${centerY})`);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      const type = this.getRandomType();
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 2 + Math.random() * 4;

      const vx = Math.cos(angle) * velocity;
      const vy = -Math.sin(angle) * velocity - 2;

      const particle: ParticleConfig = {
        type: type as any,
        x: centerX,
        y: centerY,
        vx: vx,
        vy: vy,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        rotationVelocity: (Math.random() - 0.5) * 0.1,
        opacity: 1,
        color: this.colors[type]
      };

      this.particles.push(particle);

      if (i < 3) {
        const direction = vy > 0 ? 'DOWN' : 'UP';
        const horizontalDir = vx > 0 ? 'RIGHT' : 'LEFT';
        console.log(`[${new Date().getTime()}] 🎨 Particle ${i}: ${type} - velocity: (${vx.toFixed(2)}, ${vy.toFixed(2)}) - direction: ${horizontalDir} ${direction}`);
      }
    }
    console.log(`[${new Date().getTime()}] 🎨 All ${count} particles created`);
  }

  private updateParticles(elapsed: number) {
    const progress = elapsed / this.duration;
    const gravity = 0.15;

    this.particles.forEach(particle => {
      particle.vy += gravity;
      particle.vy *= 0.98;
      particle.vx *= 0.98;

      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.rotation += particle.rotationVelocity;

      if (progress > 0.7) {
        particle.opacity = Math.max(0, 1 - (progress - 0.7) / 0.3);
      }
    });
  }

  private drawParticle(particle: ParticleConfig) {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fillStyle = particle.color;
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);

    if (particle.type === 'cherry' || particle.type === 'white' || particle.type === 'ivory') {
      this.drawPetal(particle.size);
    } else if (particle.type === 'sage') {
      this.drawLeaf(particle.size);
    } else if (particle.type === 'gold') {
      this.drawFoil(particle.size);
    }

    this.ctx.restore();
  }

  private drawPetal(size: number) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, size * 0.6, size * 0.9, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawLeaf(size: number) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawFoil(size: number) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    const points = 4;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? size * 0.5 : size * 0.2;
      const angle = (i / (points * 2)) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  private animate = (currentTime: number) => {
    if (!this.ctx || !this.canvas) return;

    if (this.startTime === 0) {
      this.startTime = currentTime;
      console.log(`[${new Date().getTime()}] 🎉 Animation started at ${this.startTime}`);
    }

    const elapsed = currentTime - this.startTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles(elapsed);
    this.particles.forEach(particle => this.drawParticle(particle));

    if (elapsed < this.duration) {
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      console.log(`[${new Date().getTime()}] 🎉 Animation completed after ${elapsed}ms`);
      this.isRunning = false;
      this.startTime = 0;
      this.particles = [];
    }
  };

  burst(centerX: number, centerY: number, duration: number = 3000) {
    console.log(`[${new Date().getTime()}] 🎉 Confetti burst() called`);
    console.log(`[${new Date().getTime()}] 🎉 Burst center: (${centerX}, ${centerY}), duration: ${duration}ms`);

    if (this.isRunning) {
      console.log(`[${new Date().getTime()}] 🎉 Confetti already running, skipping`);
      return;
    }

    this.isRunning = true;
    this.duration = duration;
    this.startTime = 0;

    const particleCount = this.getParticleCount();
    console.log(`[${new Date().getTime()}] 🎉 Creating ${particleCount} particles`);
    this.createParticles(centerX, centerY, particleCount);

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    console.log(`[${new Date().getTime()}] 🎉 Requesting animation frame for confetti`);
    this.animationId = requestAnimationFrame(this.animate);
  }

  destroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }

    this.particles = [];
    this.isRunning = false;
  }
}
