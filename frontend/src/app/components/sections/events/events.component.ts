import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="events-section" [@fadeIn]>
      <div class="events-content">
        <h2 class="section-title">Wedding Celebrations</h2>

        <div class="events-grid">
          <div class="event-card" *ngFor="let event of events; let i = index" [@slideUp]="i">
            <div class="event-illustration">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f0f5f0" opacity="0.5"/>
                <text x="150" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#7a9d5d" opacity="0.4">
                  {{ event.name }} Illustration
                </text>
              </svg>
            </div>

            <h3 class="event-name">{{ event.name }}</h3>

            <div class="event-details">
              <div class="detail-item">
                <span class="label">Date</span>
                <span class="value">{{ event.date }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Time</span>
                <span class="value">{{ event.time }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Dress Code</span>
                <span class="value">{{ event.dressCode }}</span>
              </div>
            </div>

            <div *ngIf="event.activities" class="event-activities">
              <p class="activities-title">Activities</p>
              <ul>
                <li *ngFor="let activity of event.activities">{{ activity }}</li>
              </ul>
            </div>

            <div *ngIf="event.notes" class="event-notes">
              {{ event.notes }}
            </div>

            <button class="rsvp-button">RSVP</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .events-section {
      width: 100%;
      padding: 80px 40px;
    }

    .events-content {
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

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 40px;
    }

    .event-card {
      background: rgba(250, 248, 243, 0.8);
      border: 1px solid #d4af37;
      border-radius: 8px;
      padding: 30px;
      transition: all 0.3s ease;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(212, 175, 55, 0.2);
      }
    }

    .event-illustration {
      width: 100%;
      height: 180px;
      background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 100%);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
      border: 2px solid #d4af37;
      opacity: 0.7;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .event-name {
      font-family: 'Georgia', serif;
      font-size: 24px;
      color: #7a9d5d;
      margin: 0 0 20px 0;
      letter-spacing: 0.5px;
    }

    .event-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
      padding: 20px 0;
      border-top: 1px solid #d4af37;
      border-bottom: 1px solid #d4af37;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        font-family: 'Georgia', serif;
        font-size: 12px;
        color: #7a9d5d;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        font-family: 'Georgia', serif;
        font-size: 14px;
        color: #333;
      }
    }

    .event-activities {
      margin: 20px 0;
      padding: 15px;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 4px;

      .activities-title {
        font-family: 'Georgia', serif;
        font-size: 12px;
        color: #7a9d5d;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 0 10px 0;
        letter-spacing: 0.5px;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          font-family: 'Georgia', serif;
          font-size: 13px;
          color: #555;
          margin: 5px 0;

          &:before {
            content: '• ';
            color: #d4af37;
            margin-right: 5px;
          }
        }
      }
    }

    .event-notes {
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #666;
      margin: 15px 0;
      padding: 10px;
      border-left: 2px solid #d4af37;
      font-style: italic;
    }

    .rsvp-button {
      width: 100%;
      padding: 12px;
      background: #7a9d5d;
      color: #faf8f3;
      border: 1px solid #7a9d5d;
      border-radius: 4px;
      font-family: 'Georgia', serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #6a8d4d;
        border-color: #6a8d4d;
      }
    }

    @media (max-width: 768px) {
      .events-section {
        padding: 60px 20px;
      }

      .section-title {
        font-size: 28px;
        margin-bottom: 40px;
      }

      .events-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ], { params: { delay: 0 } })
    ])
  ]
})
export class EventsComponent {
  events = [
    {
      name: 'Haldi & Mehendi',
      date: '25 August',
      time: 'Evening',
      dressCode: 'Traditional - Yellow',
      activities: ['Haldi', 'Mehendi', 'Flowers', 'Water Balloons', 'Karaoke'],
      notes: 'Guests may get wet. Bring another outfit.'
    },
    {
      name: 'Pellikuthuru',
      date: '26 August',
      time: 'Evening',
      dressCode: 'Traditional',
      activities: null,
      notes: null
    },
        {
      name: 'Pellikoduku',
      date: '26 August',
      time: 'Evening',
      dressCode: 'Traditional',
      activities: null,
      notes: null
    },
    {
      name: 'Wedding Ceremony',
      date: '27 August',
      time: 'Morning',
      dressCode: 'Traditional',
      activities: null,
      notes: null
    },
    {
      name: 'Reception',
      date: '27 August',
      time: 'Evening',
      dressCode: 'Traditional',
      activities: null,
      notes: 'Drinks available'
    }
  ];
}
