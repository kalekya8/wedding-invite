import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConfettiService } from '../../services/confetti.service';

@Component({
  selector: 'app-scratch-off',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scratch-container">
      <canvas #scratchCanvas
              class="scratch-canvas"
              (mousemove)="onMouseMove($event)"
              (mousedown)="onMouseDown()"
              (mouseup)="onMouseUp()"
              (mouseleave)="onMouseUp()"
              (touchstart)="onTouchStart($event)"
              (touchmove)="onTouchMove($event)"
              (touchend)="onTouchEnd()"></canvas>

      <div class="scratch-content">
        <p class="scratch-label" *ngIf="!isRevealed">Scratch to reveal</p>
        <div *ngIf="isRevealed" class="revealed-content" [@fadeIn]>
          <p class="wedding-date">27th August 2026</p>
          <p class="wedding-time">11:07 AM</p>
          <p class="wedding-venue">Harpers by Bailey Farms, Iowa</p>
          <div class="countdown">
            <div class="countdown-item">
              <span class="countdown-value">{{ days }}</span>
              <span class="countdown-label">days</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-value">{{ hours }}</span>
              <span class="countdown-label">hours</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-value">{{ minutes }}</span>
              <span class="countdown-label">mins</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-value">{{ seconds }}</span>
              <span class="countdown-label">secs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .scratch-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      aspect-ratio: 16 / 9;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .scratch-canvas {
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      z-index: 10;
      touch-action: none;
    }

    .scratch-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #9CA88C 0%, #8A9678 100%);
      text-align: center;
      padding: 40px 20px;
      color: white;
    }

    .scratch-label {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 1px;
      margin: 0;
      opacity: 0.9;
      animation: pulse-text 2s ease-in-out infinite;
    }

    .revealed-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
    }

    .wedding-date {
      font-size: 48px;
      font-family: 'Georgia', serif;
      margin: 0;
      color: #FFFDF7;
      font-weight: 400;
    }

    .wedding-time {
      font-size: 24px;
      margin: 0;
      color: #F7F2E8;
      font-weight: 300;
    }

    .wedding-venue {
      font-size: 16px;
      margin: 0;
      color: #E8E3D8;
    }

    .countdown {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 12px 16px;
      border-radius: 8px;
      backdrop-filter: blur(10px);
      min-width: 70px;
    }

    .countdown-value {
      font-size: 28px;
      font-weight: 600;
      color: #D4AF37;
    }

    .countdown-label {
      font-size: 12px;
      color: #F7F2E8;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    @keyframes pulse-text {
      0%, 100% {
        opacity: 0.9;
      }
      50% {
        opacity: 0.6;
      }
    }

    @media (max-width: 768px) {
      .scratch-container {
        aspect-ratio: auto;
        min-height: 300px;
      }

      .scratch-label {
        font-size: 18px;
      }

      .wedding-date {
        font-size: 36px;
      }

      .wedding-time {
        font-size: 18px;
      }

      .countdown {
        gap: 10px;
      }

      .countdown-item {
        min-width: 60px;
        padding: 10px 12px;
      }

      .countdown-value {
        font-size: 20px;
      }

      .countdown-label {
        font-size: 10px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ScratchOffComponent implements OnInit, OnDestroy {
  @ViewChild('scratchCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  isRevealed = false;
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private revealThreshold = 0.3;
  private revealedPixels = 0;

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  private countdownInterval: any;

  constructor(private confettiService: ConfettiService) {}

  ngOnInit() {
    console.log(`[${new Date().getTime()}] 🎫 ScratchOffComponent ngOnInit`);
    setTimeout(() => this.initializeScratchCanvas(), 100);
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private initializeScratchCanvas() {
    console.log(`[${new Date().getTime()}] 🎫 Initializing scratch canvas`);

    const canvas = this.canvasRef?.nativeElement;
    console.log(`[${new Date().getTime()}] 🎫 Canvas element:`, canvas);

    if (!canvas) {
      console.error(`[${new Date().getTime()}] ❌ Canvas element not found`);
      return;
    }

    console.log(`[${new Date().getTime()}] 🎫 Canvas offsetWidth: ${canvas.offsetWidth}, offsetHeight: ${canvas.offsetHeight}`);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    console.log(`[${new Date().getTime()}] 🎫 Canvas width set to: ${canvas.width}, height: ${canvas.height}`);

    this.ctx = canvas.getContext('2d');
    console.log(`[${new Date().getTime()}] 🎫 Canvas 2D context:`, this.ctx);

    if (!this.ctx) {
      console.error(`[${new Date().getTime()}] ❌ Could not get 2D context`);
      return;
    }

    this.ctx.fillStyle = '#9CA88C';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(`[${new Date().getTime()}] 🎫 Filled canvas with sage green background`);

    const text = 'Scratch to reveal';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.font = 'italic 32px Georgia, serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    console.log(`[${new Date().getTime()}] 🎫 Canvas initialized with text and background`);
  }

  onMouseDown() {
    console.log(`[${new Date().getTime()}] 🖱️ Mouse down`);
    this.isDrawing = true;
  }

  onMouseUp() {
    console.log(`[${new Date().getTime()}] 🖱️ Mouse up`);
    this.isDrawing = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing || this.isRevealed) return;
    this.scratch(event.clientX, event.clientY);
  }

  onTouchStart(event: TouchEvent) {
    console.log(`[${new Date().getTime()}] 👆 Touch start`);
    this.isDrawing = true;
  }

  onTouchEnd() {
    console.log(`[${new Date().getTime()}] 👆 Touch end`);
    this.isDrawing = false;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDrawing || this.isRevealed) return;
    const touch = event.touches[0];
    this.scratch(touch.clientX, touch.clientY);
  }

  private scratch(clientX: number, clientY: number) {
    console.log(`[${new Date().getTime()}] ✏️ Scratching at (${clientX}, ${clientY})`);

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.ctx) {
      console.error(`[${new Date().getTime()}] ❌ Canvas or context not available`);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    console.log(`[${new Date().getTime()}] ✏️ Clearing rect at (${x}, ${y}), size 40x40`);

    this.ctx.clearRect(x - 20, y - 20, 40, 40);

    this.checkReveal();
  }

  private checkReveal() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.ctx) return;

    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparent = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }

    const percentage = transparent / (data.length / 4);
    console.log(`[${new Date().getTime()}] 📊 Transparent pixels: ${percentage.toFixed(2)}% (threshold: ${this.revealThreshold * 100}%)`);

    if (percentage > this.revealThreshold && !this.isRevealed) {
      console.log(`[${new Date().getTime()}] 🎉 Reveal threshold reached!`);
      this.reveal();
    }
  }

  private reveal() {
    console.log(`[${new Date().getTime()}] 🎫 REVEALING! Setting isRevealed to true`);
    this.isRevealed = true;

    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      console.log(`[${new Date().getTime()}] 🎫 Hiding canvas`);
      canvas.style.display = 'none';
    }

    const rect = canvas?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      console.log(`[${new Date().getTime()}] 🎉 Triggering confetti at (${centerX}, ${centerY})`);
      this.confettiService.burst(centerX, centerY, 3000);
    }
  }

  private startCountdown() {
    console.log(`[${new Date().getTime()}] ⏱️ Starting countdown`);
    const weddingDate = new Date('2026-08-27T11:07:00').getTime();
    console.log(`[${new Date().getTime()}] ⏱️ Wedding date timestamp: ${weddingDate}`);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        return;
      }

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      console.log(`[${new Date().getTime()}] ⏱️ Countdown: ${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s`);
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }
}
