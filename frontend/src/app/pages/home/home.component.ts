import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { EnvelopeComponent } from '../../components/envelope/envelope.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EnvelopeComponent],
  template: `
    <div class="home-wrapper" [@fadeIn]>
      <app-envelope (onOpen)="navigateToInvite()"></app-envelope>
    </div>
  `,
  styles: [`
    .home-wrapper {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 100%);
      background-attachment: fixed;
      position: relative;
      overflow-x: hidden;
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
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToInvite() {
    this.router.navigate(['/invite']);
  }
}
