import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import gsap from 'gsap';
import { COUPLE_DATA } from '../../../models/wedding.model';
import { ConfettiService } from '../../../services/confetti.service';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full h-screen flex items-center justify-center px-4">
      <!-- Envelope Container -->
      <div class="relative w-full max-w-2xl"
           [style.perspective]="'1000px'"
           *ngIf="!isOpened()">

        <!-- Envelope -->
        <div class="relative mx-auto"
             [style.width.px]="400"
             [style.height.px]="300">

          <!-- Envelope Body (Sage Green) -->
          <div class="absolute inset-0 rounded-lg shadow-2xl"
               [style.backgroundColor]="'#9CA88C'"
               [style.backgroundImage]="'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)'">

            <!-- Envelope flap (back) -->
            <div #flap
                 class="absolute top-0 left-0 right-0 origin-top"
                 [style.height.%]="50"
                 [style.backgroundColor]="'#8A9678'"
                 [style.borderRadius]="'8px 8px 0 0'"
                 [style.transformStyle]="'preserve-3d'"
                 [style.boxShadow]="'0 4px 15px rgba(0,0,0,0.15)'"
                 [style.background]="'linear-gradient(135deg, #8A9678 0%, #7D8A71 100%)'"></div>

            <!-- Decorative botanical pattern on envelope -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                 viewBox="0 0 400 300">
              <path d="M 30 50 Q 40 40 50 50" stroke="#ffffff" stroke-width="1" fill="none"></path>
              <path d="M 350 80 Q 360 70 370 80" stroke="#ffffff" stroke-width="1" fill="none"></path>
              <path d="M 50 250 Q 60 240 70 250" stroke="#ffffff" stroke-width="1" fill="none"></path>
              <path d="M 320 220 Q 330 210 340 220" stroke="#ffffff" stroke-width="1" fill="none"></path>
            </svg>
          </div>

          <!-- Gold Wax Seal -->
          <button #seal
                  (click)="openEnvelope()"
                  class="absolute top-1/2 left-1/2 w-28 h-28 rounded-full cursor-pointer z-20 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform focus:outline-none"
                  [style.backgroundColor]="'#C8A24A'"
                  [style.boxShadow]="'0 8px 25px rgba(200, 162, 74, 0.4), inset -2px -2px 5px rgba(0,0,0,0.2), inset 2px 2px 5px rgba(255,255,255,0.3)'"
                  [style.border]="'2px solid #D4AF50'"
                  title="Click to open invitation">

            <!-- Seal content -->
            <div class="flex flex-col items-center justify-center h-full">
              <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" [style.color]="'#FFFDF7'">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M 12 7 L 15 13 L 12 15 L 9 13 Z" fill="currentColor"></path>
              </svg>
              <span [style.fontFamily]="'Great Vibes'"
                    [style.fontSize.px]="20"
                    [style.color]="'#FFFDF7'"
                    [style.fontWeight]="'300'">
                {{ coupleData.waxSealInitials }}
              </span>
            </div>

            <!-- Seal glossy shine effect -->
            <div class="absolute inset-0 rounded-full"
                 [style.background]="'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)'"></div>
          </button>
        </div>

        <!-- Click instruction -->
        <p class="text-center mt-12 text-sage-700 font-lora text-sm animate-pulse">
          Click the wax seal to open
        </p>
      </div>

      <!-- Opened Invitation -->
      <div *ngIf="isOpened()"
           [@slideIn]="'in'"
           class="w-full max-w-2xl">
        <app-hero></app-hero>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --font-vibes: 'Great Vibes', cursive;
      --font-lora: 'Lora', serif;
      --font-garamond: 'Cormorant Garamond', serif;
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class EnvelopeComponent implements OnInit {
  @ViewChild('seal') sealRef?: ElementRef;
  @ViewChild('flap') flapRef?: ElementRef;

  isOpened = signal(false);
  coupleData = COUPLE_DATA;

  constructor(private confettiService: ConfettiService) {}

  ngOnInit() {
    if (this.sealRef) {
      setTimeout(() => {
        gsap.to(this.sealRef?.nativeElement, {
          duration: 1.2,
          scale: 1.08,
          yoyo: true,
          repeat: 2,
          ease: 'power2.inOut'
        });
      }, 1500);
    }
  }

  openEnvelope() {
    if (this.isOpened()) {
      return;
    }

    const sealElement = this.sealRef?.nativeElement;
    const sealRect = sealElement.getBoundingClientRect();
    const centerX = sealRect.left + sealRect.width / 2;
    const centerY = sealRect.top + sealRect.height / 2;

    const timeline = gsap.timeline();

    timeline.to(this.sealRef?.nativeElement, {
      duration: 0.1,
      scale: 0.95,
      ease: 'power2.in'
    }, 0);

    timeline.to(this.sealRef?.nativeElement, {
      duration: 0.1,
      boxShadow: '0 8px 35px rgba(200, 162, 74, 0.8), inset -2px -2px 5px rgba(0,0,0,0.2), inset 2px 2px 5px rgba(255,255,255,0.5)',
      ease: 'power2.out'
    }, 0.1);

    setTimeout(() => {
      this.confettiService.burst(centerX, centerY, 3000);
    }, 250);

    // Seal rises and rotates slightly (500ms)
    timeline.to(this.sealRef?.nativeElement, {
      duration: 0.6,
      y: -30,
      scale: 1.05,
      rotation: -8,
      ease: 'back.out(1.2)'
    }, 0.1);

    // Flap rotates open (900ms)
    timeline.to(this.flapRef?.nativeElement, {
      duration: 0.8,
      rotateX: -145,
      transformOrigin: '50% 0%',
      ease: 'power2.out'
    }, 0.4);

    // After animation, show invitation (3000ms)
    setTimeout(() => {
      this.isOpened.set(true);
    }, 1000);
  }
})

// Import hero component
import { HeroComponent } from '../hero/hero.component';
