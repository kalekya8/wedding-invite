import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { RsvpComponent } from '../../components/sections/rsvp/rsvp.component';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [CommonModule, FormsModule, RsvpComponent],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('nameReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInDelay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms 400ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInWidth', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('600ms 300ms ease-out', style({ width: '80px', opacity: 1 }))
      ])
    ]),
    trigger('cardSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('modalSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class InviteComponent implements OnInit, AfterViewInit, OnDestroy {
  isInviteAudioPlaying$ = this.audioService.isPlaying;

  constructor(private audioService: AudioService) {}

  events = [
    {
      name: 'Haldi & Mehendi',
      date: 'August 25, 2026',
      time: '3:00 PM - 8:00 PM',
      dressCode: 'Traditional Indian Attire',
      image: 'assets/invite-cards/Haldi & Mehendi.png'
    },
    {
      name: 'Pellikuthuru',
      date: 'August 26, 2026',
      time: '6:00 PM - 10:00 PM',
      dressCode: 'Formal Traditional',
      image: 'assets/invite-cards/pellikuthuru.png'
    },
    {
      name: 'Pellikoduku',
      date: 'August 26, 2026',
      time: '6:00 PM - 10:00 PM',
      dressCode: 'Formal Traditional',
      image: 'assets/invite-cards/pellikoduku.png'
    },
    {
      name: 'Wedding Ceremony',
      date: 'August 27, 2026',
      time: '11:07 AM - 1:00 PM',
      dressCode: 'Formal Indian Wedding Attire',
      image: 'assets/invite-cards/wedding.png'
    },
    {
      name: 'Reception',
      date: 'August 27, 2026',
      time: '6:00 PM - 11:00 PM',
      dressCode: 'Formal Western / Indian Fusion',
      image: 'assets/invite-cards/reception.png'
    }
  ];

  ngOnInit() {
    console.log(`[${new Date().getTime()}] 📄 InviteComponent ngOnInit - ensuring audio is playing`);
    this.audioService.forceUnmute();
    this.audioService.play();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.audioService.pause();
  }

  toggleInviteAudio() {
    this.audioService.toggleAudio();
  }

}
