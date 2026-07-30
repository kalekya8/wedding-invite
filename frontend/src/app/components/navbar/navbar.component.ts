import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { Subscription } from 'rxjs';

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

        <button class="audio-button"
                (click)="toggleAudio()"
                [class.muted]="isMuted$ | async"
                [title]="(isMuted$ | async) ? 'Click to play music' : 'Click to mute music'"
                [@fadeIn]>
          <span class="audio-icon">♪</span>
        </button>
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
      align-items: center;

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

    .audio-button {
      background: transparent;
      border: 2px solid #d4af37;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
      min-width: 40px;

      .audio-icon {
        font-size: 20px;
        color: #7a9d5d;
        display: block;
        line-height: 1;
        animation: pulse 1.5s ease-in-out infinite;
      }

      &:hover {
        background: rgba(122, 157, 93, 0.1);
        border-color: #7a9d5d;
        transform: scale(1.1);
      }

      &.muted {
        opacity: 0.6;

        .audio-icon {
          animation: none;
        }

        &:hover {
          opacity: 1;
        }
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
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

      .audio-button {
        width: 36px;
        height: 36px;

        .audio-icon {
          font-size: 18px;
        }
      }
    }
  `],
  animations: [
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('600ms 400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms 400ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMuted$ = this.audioService.isMuted;
  private subscriptions: Subscription[] = [];
  private isMutedValue = false;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    // Subscribe to muted state
    const sub = this.isMuted$.subscribe(muted => {
      this.isMutedValue = muted;
    });
    this.subscriptions.push(sub);

    // Ensure audio plays on first user interaction
    const handleUserInteraction = () => {
      if (!this.isMutedValue) {
        this.audioService.play();
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Listen for user interaction to trigger audio playback
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Try to play immediately (might work on some browsers)
    setTimeout(() => {
      if (!this.isMutedValue) {
        this.audioService.play();
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleAudio() {
    this.audioService.toggleAudio();
  }

  scrollTo(section: string) {
    event?.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
