import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-petals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="petals-container">
      <div class="petal" *ngFor="let petal of petals"
           [style.left.%]="petal.x"
           [style.top.%]="petal.y"
           [style.animation-duration]="petal.duration + 's'"
           [style.animation-delay]="petal.delay + 's'"
           [style.opacity]="petal.opacity">
        <svg [style.width.px]="petal.size" [style.height.px]="petal.size" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g [attr.transform]="'rotate(' + petal.rotation + ' 50 50)'">
            <!-- Simple leaf/petal shape -->
            <ellipse cx="50" cy="30" rx="15" ry="25" fill="#d4af37" opacity="0.6"/>
            <ellipse cx="50" cy="30" rx="12" ry="20" fill="#e6c956" opacity="0.7"/>
          </g>
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .petals-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }

    .petal {
      position: fixed;
      pointer-events: none;
      animation: fall linear infinite;
      will-change: transform;
    }

    @keyframes fall {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 0;
      }
      5% {
        opacity: var(--petal-opacity, 0.6);
      }
      95% {
        opacity: var(--petal-opacity, 0.6);
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .petal {
        /* Reduce animation on mobile */
        animation: fall linear infinite !important;
      }
      .petals-container {
        z-index: 0;
      }
    }
  `]
})
export class PetalsComponent implements OnInit {
  petals: any[] = [];
  private mouseX = 0;
  private mouseY = 0;

  ngOnInit() {
    this.createPetals();
    this.animatePetals();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (event.touches.length > 0) {
      this.mouseX = event.touches[0].clientX;
      this.mouseY = event.touches[0].clientY;
    }
  }

  private createPetals() {
    const petalCount = 15;
    for (let i = 0; i < petalCount; i++) {
      this.petals.push({
        x: Math.random() * 100,
        y: Math.random() * -50,
        size: Math.random() * 15 + 10,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.3
      });
    }
  }

  private animatePetals() {
    setInterval(() => {
      this.petals.forEach((petal, index) => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;

        petal.x = (randomX / window.innerWidth) * 100;
        petal.duration = Math.random() * 8 + 10;
        petal.rotation = Math.random() * 360;
      });
    }, 3000);
  }
}
