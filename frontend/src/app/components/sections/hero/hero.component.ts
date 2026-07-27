import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <div class="initials-container" [@fadeIn]>
          <div class="initial-l" [@maskReveal]="'L'">
            <span class="letter">L</span>
            <span class="full-name" *ngIf="showFullNames">ohitha Kurapati</span>
          </div>

          <div class="separator" [@fadeIn]>
            <span>&</span>
          </div>

          <div class="initial-v" [@maskReveal]="'V'">
            <span class="letter">V</span>
            <span class="full-name" *ngIf="showFullNames">ivian Raj Kappala</span>
          </div>
        </div>

        <p class="tagline" [@slideUp]>Two hearts, two families, and one beautiful journey.</p>

        <div class="hero-image-placeholder" [@fadeIn]>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
            <defs>
              <pattern id="texture" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#f5f1e8"/>
                <circle cx="2" cy="2" r="0.5" fill="#e6dcc8" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="600" height="400" fill="url(#texture)"/>
            <rect x="20" y="20" width="560" height="360" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
            <text x="300" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#7a9d5d" opacity="0.4">
              Couple's Photo Placeholder
            </text>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 40px 40px;
      position: relative;
    }

    .hero-content {
      text-align: center;
      max-width: 900px;
      width: 100%;
    }

    .initials-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .initial-l, .initial-v {
      position: relative;
      font-family: 'Georgia', serif;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0;

      .letter {
        font-size: 120px;
        color: #7a9d5d;
        line-height: 1;
      }

      .full-name {
        font-size: 28px;
        color: #7a9d5d;
        letter-spacing: 1px;
        margin-left: 8px;
        font-weight: normal;
      }
    }

    .separator {
      font-family: 'Georgia', serif;
      font-size: 48px;
      color: #d4af37;
      font-weight: bold;
    }

    .tagline {
      font-family: 'Georgia', serif;
      font-size: 18px;
      color: #7a9d5d;
      font-weight: 300;
      letter-spacing: 1px;
      margin: 40px 0 60px;
      line-height: 1.6;
    }

    .hero-image-placeholder {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      aspect-ratio: 600 / 400;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 2px solid #d4af37;
      opacity: 0.8;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 60px 20px 30px;
      }

      .initial-l, .initial-v {
        .letter {
          font-size: 60px;
        }

        .full-name {
          font-size: 16px;
        }
      }

      .separator {
        font-size: 32px;
      }

      .tagline {
        font-size: 14px;
        margin: 30px 0 40px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms 200ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('600ms 400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('maskReveal', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms 300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  showFullNames = false;

  ngOnInit() {
    setTimeout(() => {
      this.showFullNames = true;
    }, 800);
  }
}
