import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="travel-section" [@fadeIn]>
      <div class="travel-content">
        <h2 class="section-title">Travel & Accommodations</h2>

        <div class="travel-grid">
          <div class="travel-card">
            <h3 class="card-title">Venue</h3>
            <div class="map-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f1e8"/>
                <circle cx="150" cy="100" r="30" fill="none" stroke="#d4af37" stroke-width="2"/>
                <text x="150" y="110" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#7a9d5d" opacity="0.4">
                  Map Placeholder
                </text>
              </svg>
            </div>
            <p class="venue-name">Venue Location Placeholder</p>
            <p class="venue-address">Address Placeholder</p>
            <a href="#" class="link-button">Get Directions</a>
          </div>

          <div class="travel-card">
            <h3 class="card-title">Airport</h3>
            <p class="info-text">Nearest Airport</p>
            <p class="airport-name">Des Moines International Airport (DSM)</p>
            <p class="info-details">Distance from venue: ~20 minutes</p>
            <a href="#" class="link-button">Driving Directions</a>
          </div>

          <div class="travel-card">
            <h3 class="card-title">Hotels</h3>
            <p class="info-text">Recommended Nearby Hotels</p>
            <ul class="hotel-list">
              <li>Hotel Name 1 - Placeholder</li>
              <li>Hotel Name 2 - Placeholder</li>
              <li>Hotel Name 3 - Placeholder</li>
            </ul>
            <a href="#" class="link-button">View Options</a>
          </div>

          <div class="travel-card">
            <h3 class="card-title">Parking</h3>
            <p class="info-text">Venue Parking Information</p>
            <p class="info-details">Ample parking available on-site</p>
            <p class="info-details">Free parking for all guests</p>
            <a href="#" class="link-button">Parking Details</a>
          </div>
        </div>

        <div class="travel-tips">
          <h3 class="tips-title">Travel Tips</h3>
          <ul>
            <li>Book accommodations early for best rates</li>
            <li>Allow extra time for traffic on wedding day</li>
            <li>Weather in Des Moines in late August: Warm and pleasant</li>
            <li>Contact us if you need any travel assistance</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .travel-section {
      width: 100%;
      padding: 80px 40px;
    }

    .travel-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-family: 'Georgia', serif;
      font-size: 36px;
      color: #7a9d5d;
      text-align: center;
      margin: 0 0 60px 0;
      letter-spacing: 1px;
    }

    .travel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }

    .travel-card {
      background: rgba(250, 248, 243, 0.9);
      border: 1px solid #d4af37;
      border-radius: 8px;
      padding: 30px;
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
        transform: translateY(-3px);
      }
    }

    .card-title {
      font-family: 'Georgia', serif;
      font-size: 20px;
      color: #7a9d5d;
      margin: 0 0 20px 0;
      letter-spacing: 0.5px;
    }

    .map-placeholder {
      width: 100%;
      height: 180px;
      background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 100%);
      border: 2px solid #d4af37;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .venue-name {
      font-family: 'Georgia', serif;
      font-size: 16px;
      color: #333;
      margin: 10px 0 5px 0;
      font-weight: 600;
    }

    .venue-address {
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #999;
      margin: 0 0 15px 0;
    }

    .info-text {
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #7a9d5d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 8px 0;
      font-weight: 600;
    }

    .airport-name {
      font-family: 'Georgia', serif;
      font-size: 16px;
      color: #333;
      margin: 10px 0 8px 0;
      font-weight: 600;
    }

    .info-details {
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #666;
      margin: 5px 0;
    }

    .hotel-list {
      list-style: none;
      margin: 15px 0;
      padding: 0;

      li {
        font-family: 'Georgia', serif;
        font-size: 12px;
        color: #666;
        margin: 8px 0;

        &:before {
          content: '• ';
          color: #d4af37;
          margin-right: 5px;
        }
      }
    }

    .link-button {
      display: inline-block;
      padding: 10px 20px;
      background: #7a9d5d;
      color: #faf8f3;
      text-decoration: none;
      border-radius: 4px;
      font-family: 'Georgia', serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      margin-top: 10px;

      &:hover {
        background: #6a8d4d;
      }
    }

    .travel-tips {
      background: rgba(250, 248, 243, 0.9);
      border: 1px solid #d4af37;
      border-radius: 8px;
      padding: 40px;
      max-width: 600px;
      margin: 0 auto;
    }

    .tips-title {
      font-family: 'Georgia', serif;
      font-size: 24px;
      color: #7a9d5d;
      text-align: center;
      margin: 0 0 25px 0;
      letter-spacing: 0.5px;
    }

    .travel-tips ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        font-family: 'Georgia', serif;
        font-size: 13px;
        color: #555;
        margin: 12px 0;
        padding-left: 20px;
        line-height: 1.6;

        &:before {
          content: '✓ ';
          color: #d4af37;
          margin-left: -20px;
          margin-right: 10px;
          font-weight: bold;
        }
      }
    }

    @media (max-width: 768px) {
      .travel-section {
        padding: 60px 20px;
      }

      .section-title {
        font-size: 28px;
        margin-bottom: 40px;
      }

      .travel-grid {
        gap: 20px;
      }

      .travel-tips {
        padding: 30px 20px;
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
export class TravelComponent {
}
