import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div *ngFor="let particle of particles"
           class="absolute text-3xl animate-float"
           [style.left]="particle.x + '%'"
           [style.top]="'-10vh'"
           [style.animation]="'float ' + particle.duration + 's linear infinite'">
        {{ particle.emoji }}
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      to {
        transform: translateY(110vh) translateX(var(--tx));
        opacity: 0;
      }
    }

    .animate-float {
      animation: float linear infinite;
      opacity: 1;
    }
  `]
})
export class ParticlesComponent implements OnInit {
  particles: any[] = [];
  private emojis = ['🌸', '🌿', '🤍'];

  ngOnInit() {
    this.generateParticles();
  }

  private generateParticles() {
    const particleCount = 6;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)],
        x: Math.random() * 100,
        duration: 12 + Math.random() * 8,
        delay: i * 0.5
      });
    }
  }
}
