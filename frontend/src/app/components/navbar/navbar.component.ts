import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [@slideInDown]>
      <div class="navbar-content">
        <div class="logo">L & V</div>

        <ul class="nav-menu">
          <li><a href="#events" (click)="scrollTo('events')">Events</a></li>
          <li><a href="#story" (click)="scrollTo('story')">Our Story</a></li>
          <li><a href="#travel" (click)="scrollTo('travel')">Travel</a></li>
          <li><a href="#rsvp" (click)="scrollTo('rsvp')">RSVP</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(250, 248, 243, 0.98);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-family: 'Georgia', serif;
      font-size: 24px;
      font-weight: bold;
      color: #7a9d5d;
      letter-spacing: 2px;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 40px;

      li {
        a {
          font-family: 'Georgia', serif;
          font-size: 14px;
          color: #7a9d5d;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 1px;
            background: #d4af37;
            transition: width 0.3s ease;
          }

          &:hover {
            color: #d4af37;

            &::after {
              width: 100%;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .navbar-content {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
      }

      .nav-menu {
        gap: 20px;
        font-size: 12px;
      }
    }
  `],
  animations: [
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('600ms 400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class NavbarComponent {
  scrollTo(section: string) {
    event?.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
