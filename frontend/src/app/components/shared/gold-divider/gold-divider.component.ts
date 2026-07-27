import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gold-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center py-8">
      <div class="w-16 h-0.5"
           [style.background]="'linear-gradient(to right, transparent, #C8A24A 20%, #C8A24A 80%, transparent)'">
      </div>
    </div>
  `,
  styles: []
})
export class GoldDividerComponent {}
