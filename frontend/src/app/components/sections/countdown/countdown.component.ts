import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="countdown-section" [@fadeIn]>
      <div class="countdown-content">
        <h2 class="section-title">Save the Date</h2>

        <div class="scratch-card-container">
          <div class="scratch-card" #scratchCard (mousedown)="startScratching($event)" (touchstart)="startScratching($event)" (mousemove)="scratch($event)" (touchmove)="scratch($event)" (mouseup)="stopScratching()" (touchend)="stopScratching()">
            <canvas #scratchCanvas class="scratch-canvas"></canvas>
            <div class="scratch-content">
              <div class="content-inner">
                <p class="wedding-date">27 August 2026</p>
                <p class="days-remaining" *ngIf="daysRemaining > 0">{{ daysRemaining }} days to go</p>
              </div>
            </div>
          </div>
          <p class="scratch-hint">Scratch to reveal</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .countdown-section {
      width: 100%;
      padding: 80px 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(245, 241, 232, 0.5) 0%, rgba(250, 248, 243, 0.5) 100%);
    }

    .countdown-content {
      max-width: 600px;
      width: 100%;
      text-align: center;
    }

    .section-title {
      font-family: 'Georgia', serif;
      font-size: 36px;
      color: #7a9d5d;
      margin: 0 0 60px 0;
      letter-spacing: 1px;
    }

    .scratch-card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .scratch-card {
      width: 100%;
      max-width: 400px;
      height: 250px;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .scratch-canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      display: block;
    }

    .scratch-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #d4af37 0%, #e6c956 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .content-inner {
      text-align: center;
      pointer-events: none;
    }

    .wedding-date {
      font-family: 'Georgia', serif;
      font-size: 32px;
      color: #8b6914;
      margin: 0 0 15px 0;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .days-remaining {
      font-family: 'Georgia', serif;
      font-size: 18px;
      color: #7a5c0f;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .scratch-hint {
      font-family: 'Georgia', serif;
      font-size: 14px;
      color: #7a9d5d;
      opacity: 0.6;
      margin: 0;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .countdown-section {
        padding: 60px 20px;
      }

      .section-title {
        font-size: 28px;
        margin-bottom: 40px;
      }

      .scratch-card {
        height: 200px;
      }

      .wedding-date {
        font-size: 24px;
      }

      .days-remaining {
        font-size: 14px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CountdownComponent implements OnInit {
  @ViewChild('scratchCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  daysRemaining = 0;
  private isScratching = false;
  private scratchCanvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  ngOnInit() {
    this.calculateDaysRemaining();
    setTimeout(() => this.initializeScratchCard(), 500);
  }

  ngAfterViewInit() {
    this.initializeScratchCard();
  }

  private calculateDaysRemaining() {
    const weddingDate = new Date('2026-08-27');
    const today = new Date();
    const diff = weddingDate.getTime() - today.getTime();
    this.daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  private initializeScratchCard() {
    const canvas = document.querySelector('.scratch-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    this.scratchCanvas = canvas;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.ctx.fillStyle = '#9ca3a3';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.font = 'bold 16px Georgia, serif';
    this.ctx.fillStyle = '#666';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Scratch here', canvas.width / 2, canvas.height / 2);
  }

  startScratching(e: MouseEvent | TouchEvent) {
    this.isScratching = true;
  }

  stopScratching() {
    this.isScratching = false;
  }

  scratch(e: MouseEvent | TouchEvent) {
    if (!this.isScratching || !this.ctx || !this.scratchCanvas) return;

    e.preventDefault();

    const canvas = this.scratchCanvas;
    const rect = canvas.getBoundingClientRect();
    const event = e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.ctx.clearRect(x - 20, y - 20, 40, 40);
  }
}
