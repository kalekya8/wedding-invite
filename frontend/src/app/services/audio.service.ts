import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isMuted$ = new BehaviorSubject<boolean>(true);
  private isPlaying$ = new BehaviorSubject<boolean>(false);

  isMuted = this.isMuted$.asObservable();
  isPlaying = this.isPlaying$.asObservable();

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    if (typeof document === 'undefined') return;

    this.audio = new Audio('/assets/audio/Radha Ramanam _ Tipparaa Meesam _ Anurag Kulkarni _ Nutana Mohan _ Sing Telugu.mp3');
    this.audio.volume = 0.5;
    this.audio.loop = true;

    this.audio.addEventListener('play', () => {
      this.isPlaying$.next(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying$.next(false);
    });

    // Restore muted state from localStorage if available
    const savedMutedState = localStorage.getItem('wedding_audio_muted');
    if (savedMutedState !== null) {
      const muted = JSON.parse(savedMutedState);
      this.isMuted$.next(muted);
    }
  }

  toggleAudio() {
    if (!this.audio) return;

    const currentMutedState = this.isMuted$.value;

    if (currentMutedState) {
      // Unmute and play
      this.audio.play().catch(err => {
        console.warn('Audio autoplay blocked by browser:', err);
      });
      this.isMuted$.next(false);
    } else {
      // Mute and pause
      this.audio.pause();
      this.isMuted$.next(true);
    }

    // Save state to localStorage
    localStorage.setItem('wedding_audio_muted', JSON.stringify(!currentMutedState));
  }

  play() {
    if (!this.audio) return;
    this.audio.play().catch(err => {
      console.warn('Audio autoplay blocked:', err);
    });
    this.isMuted$.next(false);
    localStorage.setItem('wedding_audio_muted', 'false');
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isMuted$.next(true);
    localStorage.setItem('wedding_audio_muted', 'true');
  }

  setVolume(volume: number) {
    if (!this.audio) return;
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
