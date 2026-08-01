import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="music-player" [@slideIn]>
      <button class="volume-button" (click)="toggleMute()" [class.muted]="isMuted">
        <span *ngIf="!isMuted" class="icon">🔊</span>
        <span *ngIf="isMuted" class="icon">🔇</span>
      </button>
    </div>
  `,
  styles: [`
    .music-player {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 999;
    }

    .volume-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #d4af37;
      border: 2px solid #8b6914;
      color: #333;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
      opacity: 0.9;

      &:hover {
        transform: scale(1.1);
        opacity: 1;
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
      }

      &.muted {
        opacity: 0.7;
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .music-player {
        bottom: 20px;
        right: 20px;
      }

      .volume-button {
        width: 45px;
        height: 45px;
        font-size: 20px;
      }
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate('600ms 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class MusicPlayerComponent {
  isMuted = false;

  toggleMute() {
    this.isMuted = !this.isMuted;
  }
}
