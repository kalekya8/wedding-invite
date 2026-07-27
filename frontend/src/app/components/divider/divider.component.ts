import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  template: `
    <div class="divider-section" [@fadeIn]>
      <div class="divider-content">
        <svg class="bridge-icon" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Brooklyn Bridge inspired elegant line art -->
          <g stroke="#d4af37" stroke-width="1.5" fill="none" opacity="0.7">
            <!-- Main bridge cables -->
            <path d="M 50 100 L 200 50 L 350 100"/>
            <path d="M 50 100 L 200 150 L 350 100"/>

            <!-- Vertical suspenders -->
            <line x1="80" y1="80" x2="80" y2="120"/>
            <line x1="120" y1="65" x2="120" y2="135"/>
            <line x1="160" y1="55" x2="160" y2="145"/>
            <line x1="200" y1="50" x2="200" y2="150"/>
            <line x1="240" y1="55" x2="240" y2="145"/>
            <line x1="280" y1="65" x2="280" y2="135"/>
            <line x1="320" y1="80" x2="320" y2="120"/>

            <!-- Decorative elements -->
            <circle cx="50" cy="100" r="3"/>
            <circle cx="200" cy="50" r="3"/>
            <circle cx="350" cy="100" r="3"/>
          </g>
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .divider-section {
      width: 100%;
      padding: 60px 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.1), transparent);
    }

    .divider-content {
      width: 100%;
      max-width: 600px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bridge-icon {
      width: 100%;
      height: 100%;
      max-width: 400px;
    }

    @media (max-width: 768px) {
      .divider-section {
        padding: 40px 20px;
      }

      .divider-content {
        height: 80px;
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
export class DividerComponent {
}
