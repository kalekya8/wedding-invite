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

    console.log('🎵 DEBUG: Initializing audio...');

    const audioPath = '/assets/audio/radha-ramanam.mp3';
    console.log('🎵 DEBUG: Audio path:', audioPath);

    this.audio = new Audio(audioPath);
    console.log('🎵 DEBUG: Audio element created');

    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    console.log('🎵 DEBUG: Audio properties set, volume:', this.audio.volume);

    this.audio.addEventListener('play', () => {
      console.log('▶️ DEBUG: Audio playing');
      this.isPlaying$.next(true);
      this.isMuted$.next(false);
    });

    this.audio.addEventListener('pause', () => {
      console.log('⏸️ DEBUG: Audio paused');
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('ended', () => {
      console.log('🔄 DEBUG: Audio ended (will loop)');
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('loadstart', () => {
      console.log('📥 DEBUG: Audio loading started');
    });

    this.audio.addEventListener('canplay', () => {
      console.log('✅ DEBUG: Audio can play');
    });

    this.audio.addEventListener('error', (e) => {
      console.error('❌ DEBUG: Audio error:', e);
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

    console.log('🎵 DEBUG: Setting up user interaction listener');

    const playAudioOnInteraction = () => {
      console.log('🎵 DEBUG: User interaction detected, userInteracted:', this.userInteracted, 'isMuted:', this.isMuted$.value);

      if (!this.userInteracted && !this.isMuted$.value) {
        console.log('🎵 DEBUG: Playing audio on first user interaction');
        this.userInteracted = true;
        this.play();
      }
      // Remove listeners after first interaction
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
      console.error('❌ DEBUG: No audio element');
      return;
    }

    console.log('▶️ DEBUG: Calling audio.play()');

    this.audio.play()
      .then(() => {
        console.log('✅ DEBUG: audio.play() succeeded');
        this.isMuted$.next(false);
      })
      .catch(err => {
        console.error('❌ DEBUG: audio.play() failed:', err.name, err.message);
      });

    localStorage.setItem('wedding_audio_muted', 'false');
  }

  pause() {
    if (!this.audio) {
      console.error('❌ DEBUG: No audio element');
      return;
    }

    console.log('🔇 DEBUG: Pausing audio');
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
