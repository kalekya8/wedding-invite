import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isMuted$ = new BehaviorSubject<boolean>(false);
  private isPlaying$ = new BehaviorSubject<boolean>(false);
  private userInteracted = false;

  isMuted = this.isMuted$.asObservable();
  isPlaying = this.isPlaying$.asObservable();

  constructor() {
    this.initializeAudio();
    this.setupUserInteractionListener();
  }

  private initializeAudio() {
    if (typeof document === 'undefined') return;

    const audioPath = '/assets/audio/radha-ramanam.mp3';
    this.audio = new Audio(audioPath);

    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying$.next(true);
      this.isMuted$.next(false);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('loadstart', () => {
    });

    this.audio.addEventListener('canplay', () => {
    });

    this.audio.addEventListener('error', (e) => {
    });

    // Default: NOT muted on initialization
    this.isMuted$.next(false);

    // Restore muted state from localStorage if available
    const savedMutedState = localStorage.getItem('wedding_audio_muted');

    if (savedMutedState !== null) {
      const muted = JSON.parse(savedMutedState);
      this.isMuted$.next(muted);
    }
  }

  private setupUserInteractionListener() {
    if (typeof document === 'undefined') return;

    const playAudioOnInteraction = () => {
      if (!this.userInteracted && !this.isMuted$.value) {
        this.userInteracted = true;
        this.play();
      }
      document.removeEventListener('click', playAudioOnInteraction);
      document.removeEventListener('scroll', playAudioOnInteraction);
      document.removeEventListener('touchstart', playAudioOnInteraction);
    };

    document.addEventListener('click', playAudioOnInteraction);
    document.addEventListener('scroll', playAudioOnInteraction);
    document.addEventListener('touchstart', playAudioOnInteraction);
  }

  toggleAudio() {
    if (!this.audio) return;

    const currentMutedState = this.isMuted$.value;

    if (currentMutedState) {
      // Unmute and play
      this.play();
    } else {
      // Mute and pause
      this.pause();
    }
  }

  play() {
    if (!this.audio) {
      return;
    }

    this.audio.play()
      .then(() => {
        this.isMuted$.next(false);
      })
      .catch(() => {
      });

    localStorage.setItem('wedding_audio_muted', 'false');
  }

  pause() {
    if (!this.audio) {
      return;
    }

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
