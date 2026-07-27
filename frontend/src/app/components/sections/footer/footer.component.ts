import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer" [@fadeIn]>
      <div class="footer-content">
        <div class="footer-divider"></div>

        <p class="footer-label">With Love</p>

        <h3 class="footer-names">L & V</h3>

        <p class="footer-names-full">Lohitha & Vivian</p>

        <p class="footer-date">27 August 2026</p>

        <div class="footer-divider"></div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      width: 100%;
      padding: 60px 40px;
      background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 100%);
      border-top: 1px solid #d4af37;
      text-align: center;
    }

    .footer-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .footer-divider {
      width: 100px;
      height: 1px;
      background: #d4af37;
      margin: 20px auto;
      opacity: 0.6;
    }

    .footer-label {
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #7a9d5d;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 20px 0;
      font-weight: 600;
    }

    .footer-names {
      font-family: 'Georgia', serif;
      font-size: 32px;
      color: #7a9d5d;
      margin: 15px 0;
      letter-spacing: 3px;
      font-weight: bold;
    }

    .footer-names-full {
      font-family: 'Georgia', serif;
      font-size: 16px;
      color: #7a9d5d;
      margin: 10px 0 20px 0;
      letter-spacing: 1px;
    }

    .footer-date {
      font-family: 'Georgia', serif;
      font-size: 13px;
      color: #999;
      margin: 10px 0;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 40px 20px;
      }

      .footer-names {
        font-size: 24px;
      }

      .footer-names-full {
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
export class FooterComponent {
}
