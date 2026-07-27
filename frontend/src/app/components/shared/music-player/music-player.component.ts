import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="toggleMute()"
            class="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full hover:scale-110 transition-transform flex items-center justify-center text-cream"
            [style.backgroundColor]="isMuted() ? '#A67C2E' : '#C8A24A'"
            [style.boxShadow]="'0 4px 20px rgba(200, 162, 74, 0.25)'"
            [title]="isMuted() ? 'Click to unmute' : 'Click to mute'"
            [attr.aria-label]="isMuted() ? 'Unmute music' : 'Mute music'">
      <span *ngIf="isMuted()" class="text-xl">🔇</span>
      <span *ngIf="!isMuted()" class="text-xl animate-pulse">🔊</span>
    </button>

    <audio #audioPlayer loop>
      <source src="/assets/audio/wedding-song.mp3" type="audio/mpeg">
    </audio>
  `,
  styles: []
})
export class MusicPlayerComponent implements OnInit {
  isMuted = signal(true);
  private audioElement?: HTMLAudioElement;

  ngOnInit() {
    // Load mute preference from localStorage
    const savedState = localStorage.getItem('music-muted');
    if (savedState !== null) {
      this.isMuted.set(JSON.parse(savedState));
    }
  }

  toggleMute() {
    this.isMuted.update(val => !val);
    localStorage.setItem('music-muted', JSON.stringify(this.isMuted()));
  }
}
