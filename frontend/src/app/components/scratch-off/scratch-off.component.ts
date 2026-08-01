import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConfettiService } from '../../services/confetti.service';

@Component({
  selector: 'app-scratch-off',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scratch-wrapper">
      <div class="location-info">
        <p class="wedding-venue">Harpers by Bailey Farms, Iowa</p>
      </div>

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
    </div>
  `,
  styles: [`
    .scratch-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .location-info {
      text-align: center;
      margin-bottom: 30px;
      padding: 0 20px;
    }

    .location-info .wedding-venue {
      font-size: 28px;
      color: #7a9d5d;
      margin: 0;
      font-family: 'Georgia', serif;
      font-weight: 300;
      letter-spacing: 0.5px;
    }

    .scratch-container {
      position: relative;
      width: 500px;
      height: 350px;
      max-width: 100%;
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .scratch-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 10;
      touch-action: none;
      display: block;
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
      color: rgba(255, 255, 255, 0.8);
    }

    .revealed-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      background: transparent;
    }

    .wedding-date {
      font-size: 40px;
      font-family: 'Georgia', serif;
      margin: 0;
      color: #7a9d5d;
      font-weight: 400;
    }

    .wedding-time {
      font-size: 20px;
      margin: 0;
      color: #9AA68A;
      font-weight: 300;
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
      color: #7a9d5d;
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
    setTimeout(() => this.initializeScratchCanvas(), 100);
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private initializeScratchCanvas() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const container = canvas.parentElement?.parentElement;
    let width = canvas.offsetWidth || container?.offsetWidth || 500;
    let height = canvas.offsetHeight || container?.offsetHeight || 350;

    canvas.width = width;
    canvas.height = height;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.ctx.fillStyle = '#9CA88C';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    const text = 'Scratch to reveal';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.font = 'italic 32px Georgia, serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  onMouseDown() {
    this.isDrawing = true;
  }

  onMouseUp() {
    this.isDrawing = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing || this.isRevealed) return;
    this.scratch(event.clientX, event.clientY);
  }

  onTouchStart(event: TouchEvent) {
    this.isDrawing = true;
  }

  onTouchEnd() {
    this.isDrawing = false;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDrawing || this.isRevealed) return;
    const touch = event.touches[0];
    this.scratch(touch.clientX, touch.clientY);
  }

  private scratch(clientX: number, clientY: number) {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

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

    if (percentage > this.revealThreshold && !this.isRevealed) {
      this.reveal();
    }
  }

  private reveal() {
    this.isRevealed = true;

    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      canvas.style.display = 'none';

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      this.confettiService.burst(centerX, centerY, 3000);
    }
  }

  private startCountdown() {
    const weddingDate = new Date('2026-08-27T11:07:00').getTime();

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
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }
}
