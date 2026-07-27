import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="story-section" [@fadeIn]>
      <div class="story-content">
        <h2 class="section-title">Our Story</h2>

        <div class="couple-stories">
          <div class="person-story">
            <div class="photo-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="140" fill="#f5f1e8" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
                <text x="150" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#7a9d5d" opacity="0.4">
                  Lohitha's Photo
                </text>
              </svg>
            </div>
            <h3 class="name">Lohitha Kurapati</h3>
            <p class="bio">Placeholder for bride's introduction and story. This section can be customized to share details about her background, interests, and journey.</p>
          </div>

          <div class="person-story">
            <div class="photo-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="140" fill="#f5f1e8" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
                <text x="150" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#7a9d5d" opacity="0.4">
                  Vivian's Photo
                </text>
              </svg>
            </div>
            <h3 class="name">Vivian Raj Kappala</h3>
            <p class="bio">Placeholder for groom's introduction and story. This section can be customized to share details about his background, interests, and journey.</p>
          </div>
        </div>

        <div class="parents-section">
          <h3 class="subsection-title">Our Families</h3>

          <div class="families">
            <div class="family">
              <h4>Bride's Parents</h4>
              <p>RamaRao Kurapati</p>
              <p>Rani Kurapati</p>
            </div>

            <div class="family">
              <h4>Groom's Parents</h4>
              <p>Raja Bhushan Kappala</p>
              <p>Suhasini Beulah</p>
            </div>
          </div>
        </div>

        <div class="pets-section">
          <h3 class="subsection-title">Our Pets</h3>

          <div class="pets">
            <div class="pet">
              <div class="pet-photo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                  <rect width="200" height="200" fill="#f0f5f0" opacity="0.5"/>
                  <circle cx="100" cy="100" r="80" fill="#f5f1e8" stroke="#d4af37" stroke-width="1" opacity="0.6"/>
                  <text x="100" y="105" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#7a9d5d" opacity="0.4">
                    Leo's Photo
                  </text>
                </svg>
              </div>
              <h4>Leo Singhroy</h4>
              <p class="pet-breed">Maltipoo</p>
            </div>

            <div class="pet">
              <div class="pet-photo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                  <rect width="200" height="200" fill="#f0f5f0" opacity="0.5"/>
                  <circle cx="100" cy="100" r="80" fill="#f5f1e8" stroke="#d4af37" stroke-width="1" opacity="0.6"/>
                  <text x="100" y="105" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#7a9d5d" opacity="0.4">
                    Tyson's Photo
                  </text>
                </svg>
              </div>
              <h4>Tyson Bhalla</h4>
              <p class="pet-breed">Nova Scotia Duck Tolling Retriever</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .story-section {
      width: 100%;
      padding: 80px 40px;
      background: linear-gradient(135deg, rgba(245, 241, 232, 0.3) 0%, rgba(250, 248, 243, 0.3) 100%);
    }

    .story-content {
      max-width: 1000px;
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

    .couple-stories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 50px;
      margin-bottom: 80px;
    }

    .person-story {
      text-align: center;
    }

    .photo-placeholder {
      width: 250px;
      height: 250px;
      margin: 0 auto 30px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      font-family: 'Georgia', serif;
      font-size: 22px;
      color: #7a9d5d;
      margin: 0 0 15px 0;
      letter-spacing: 0.5px;
    }

    .bio {
      font-family: 'Georgia', serif;
      font-size: 14px;
      color: #555;
      line-height: 1.7;
      margin: 0;
    }

    .parents-section {
      margin-bottom: 60px;
      padding: 40px;
      background: rgba(250, 248, 243, 0.8);
      border: 1px solid #d4af37;
      border-radius: 8px;
    }

    .subsection-title {
      font-family: 'Georgia', serif;
      font-size: 24px;
      color: #7a9d5d;
      text-align: center;
      margin: 0 0 30px 0;
      letter-spacing: 0.5px;
    }

    .families {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
    }

    .family {
      text-align: center;

      h4 {
        font-family: 'Georgia', serif;
        font-size: 14px;
        color: #7a9d5d;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 0 10px 0;
        letter-spacing: 0.5px;
      }

      p {
        font-family: 'Georgia', serif;
        font-size: 14px;
        color: #333;
        margin: 5px 0;
      }
    }

    .pets-section {
      padding: 40px;
      background: rgba(250, 248, 243, 0.8);
      border: 1px solid #d4af37;
      border-radius: 8px;
    }

    .pets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
    }

    .pet {
      text-align: center;
    }

    .pet-photo {
      width: 180px;
      height: 180px;
      margin: 0 auto 15px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #d4af37;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .pet h4 {
      font-family: 'Georgia', serif;
      font-size: 16px;
      color: #7a9d5d;
      margin: 10px 0 5px 0;
      letter-spacing: 0.5px;
    }

    .pet-breed {
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #999;
      margin: 0;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .story-section {
        padding: 60px 20px;
      }

      .section-title {
        font-size: 28px;
        margin-bottom: 40px;
      }

      .couple-stories {
        gap: 30px;
        margin-bottom: 40px;
      }

      .photo-placeholder {
        width: 200px;
        height: 200px;
      }

      .families, .pets {
        gap: 20px;
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
export class StoryComponent {
}
