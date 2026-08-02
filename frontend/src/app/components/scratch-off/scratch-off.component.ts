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
        <p class="wedding-venue">Harpers by Bailey Farms,<br>Iowa</p>
      </div>

      <div class="venue-address-info">
        <p class="venue-name">Harpers by Bailey Farms</p>
        <p class="venue-address">3014 Scott St, New Virginia, IA 50210</p>
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
      padding: 0 10%;
    }

    .location-info {
      text-align: center;
      margin-bottom: 15px;
      padding: 0 10%;
    }

    @media (max-width: 768px) {
      .location-info {
        margin-bottom: 15px;
        padding: 0 10px;
      }
    }

    .location-info .wedding-venue {
      font-size: 28px;
      color: #7a9d5d;
      margin: 0;
      font-family: 'Georgia', serif;
      font-weight: 300;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }

    .scratch-container {
      position: relative;
      width: 900px;
      height: 280px;
      max-width: calc(100% - 40px);
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 40px;
      margin-left: 20px;
      margin-right: 20px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .scratch-container {
        max-width: calc(100% - 60px);
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 20px;
        margin-bottom: 40px;
        height: 200px;
        width: 100%;
      }
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
      font-size: 32px;
      font-family: 'Georgia', serif;
      margin: 0;
      color: #D4AF37;
      font-weight: 400;
    }

    .wedding-time {
      font-size: 16px;
      margin: 0;
      color: #D4AF37;
      font-weight: 300;
    }

    .venue-address-info {
      text-align: center;
      margin-bottom: 15px;
      padding: 0 10%;
    }

    .venue-name {
      font-size: 18px;
      font-weight: 500;
      color: #7a9d5d;
      margin: 0;
      font-family: 'Georgia', serif;
    }

    .venue-address {
      font-size: 14px;
      color: #9AA68A;
      margin: 5px 0 0 0;
      font-family: 'Georgia', serif;
    }

    @media (max-width: 768px) {
      .venue-address-info {
        margin-bottom: 15px;
        padding: 0 10px;
      }

      .venue-name {
        font-size: 16px;
      }

      .venue-address {
        font-size: 12px;
      }
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
      .scratch-label {
        font-size: 20px;
      }

      .wedding-date {
        font-size: 32px;
      }

      .wedding-time {
        font-size: 14px;
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

  constructor(private confettiService: ConfettiService) {}

  ngOnInit() {
    setTimeout(() => this.initializeScratchCanvas(), 100);
  }

  ngOnDestroy() {}

  private initializeScratchCanvas() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const container = canvas.parentElement?.parentElement;
    let width = canvas.offsetWidth || container?.offsetWidth || 400;
    let height = canvas.offsetHeight || container?.offsetHeight || 250;

    canvas.width = width;
    canvas.height = height;

    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
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
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      canvas.style.display = 'none';
      this.confettiService.burst(centerX, centerY, 3000);
    }
  }
}
