import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="envelope-container" [@fadeIn]>
      <div class="envelope-wrapper">

        <!-- CLOSED ENVELOPE - Clickable -->
        <div class="envelope-closed"
             [@envelopeOpen]="envelopeState"
             (click)="openEnvelope()"
             *ngIf="envelopeState === 'closed'">

          <!-- Actual envelope image -->
          <img src="assets/images/envelope.png"
               alt="Luxury wedding invitation envelope"
               class="envelope-image"
               (click)="openEnvelope()">

          <!-- Invitation text below -->
          <div class="invitation-text" [@textFade]="envelopeState">
            <p class="invitation-label">You are invited to be a part of our celebration</p>
          </div>
        </div>

        <!-- OPENING ANIMATION - Seal cracks, envelope opens -->
        <!-- IMPORTANT: This animation plays but we don't show the "opened" state here -->
        <!-- The parent component handles showing the website content -->
        <div class="envelope-opening"
             *ngIf="envelopeState === 'opening'"
             [@envelopeOpening]="envelopeState">

          <img src="assets/images/envelope.png"
               alt="Luxury wedding invitation envelope"
               class="envelope-image-opening">

          <!-- Animated seal crack overlay -->
          <div class="seal-crack" [@sealCrack]="'cracking'"></div>

          <!-- Flap opening animation -->
          <div class="flap-opening" [@flapOpen]="'opening'"></div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .envelope-container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: #f5f1e8;
      background-attachment: fixed;
      perspective: 1000px;
    }

    .envelope-wrapper {
      position: relative;
      width: 100%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
    }

    /* CLOSED ENVELOPE STATE */
    .envelope-closed {
      position: relative;
      width: 100%;
      max-width: 450px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }

    .envelope-image {
      width: 100%;
      max-width: 450px;
      height: auto;
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.12));
      transition: transform 0.3s ease;
      cursor: pointer;
      display: block;

      &:hover {
        transform: scale(1.03);
      }
    }

    .invitation-text {
      text-align: center;
      z-index: 5;
      width: 100%;
      padding: 0 20px;
    }

    .invitation-label {
      font-family: 'Cormorant Garamond', 'Georgia', serif;
      font-size: 18px;
      font-weight: 400;
      color: #7a9d5d;
      letter-spacing: 2px;
      margin: 0;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      line-height: 1.6;
      max-width: 420px;
      font-style: italic;
    }

    /* OPENING ANIMATION STATE */
    .envelope-opening {
      position: relative;
      width: 100%;
      max-width: 450px;
    }

    .envelope-image-opening {
      width: 100%;
      max-width: 450px;
      height: auto;
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.12));
      display: block;
    }

    .seal-crack {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .flap-opening {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
    }


    @media (max-width: 768px) {
      .envelope-container {
        height: auto;
        min-height: 100vh;
        padding: 20px;
      }

      .envelope-wrapper {
        max-width: 100%;
      }

      .envelope-closed {
        max-width: 100%;
      }

      .envelope-image,
      .envelope-image-opening {
        max-width: 100%;
      }

      .invitation-label {
        font-size: 14px;
      }

      .inside-card {
        padding: 35px 25px;
      }

      .couple-names {
        flex-direction: column;
        margin-bottom: 20px;
      }

      .parents {
        flex-direction: column;
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
    ]),
    trigger('envelopeOpen', [
      state('closed', style({ transform: 'scale(1)', opacity: 1 })),
      state('opening', style({ transform: 'scale(1)', opacity: 1 })),
      transition('closed => opening', animate('0ms'))
    ]),
    trigger('sealCrack', [
      transition('cracking => cracking', [
        style({ transform: 'scale(1) rotate(0deg)' }),
        animate('600ms ease-out', style({ transform: 'scale(1.05) rotate(3deg)', opacity: 0.7 }))
      ])
    ]),
    trigger('flapOpen', [
      transition('opening => opening', [
        style({ transform: 'rotateX(0deg)' }),
        animate('1200ms 200ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'rotateX(-160deg)' }))
      ])
    ]),
    trigger('envelopeOpening', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('1400ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('cardReveal', [
      transition('opened => opened', [
        style({ opacity: 0 }),
        animate('400ms 400ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('textFade', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('600ms 800ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('600ms 600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class EnvelopeComponent implements OnInit {
  @Output() onOpen = new EventEmitter<void>();
  envelopeState: 'closed' | 'opening' = 'closed';

  ngOnInit() {
    // Envelope starts in closed state
  }

  openEnvelope() {
    if (this.envelopeState === 'closed') {
      this.envelopeState = 'opening';
      this.onOpen.emit();
    }
  }
}
