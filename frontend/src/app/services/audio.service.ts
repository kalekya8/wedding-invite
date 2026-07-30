import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isMuted$ = new BehaviorSubject<boolean>(false);
  private isPlaying$ = new BehaviorSubject<boolean>(false);
  private autoplayAttempted = false;

  isMuted = this.isMuted$.asObservable();
  isPlaying = this.isPlaying$.asObservable();

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    if (typeof document === 'undefined') return;

    console.log('🎵 AudioService: Initializing audio...');

    this.audio = new Audio('/assets/audio/Radha Ramanam _ Tipparaa Meesam _ Anurag Kulkarni _ Nutana Mohan _ Sing Telugu.mp3');
    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    console.log('🎵 AudioService: Audio element created, volume:', this.audio.volume);

    this.audio.addEventListener('play', () => {
      console.log('▶️  AudioService: Audio playing');
      this.isPlaying$.next(true);
      this.isMuted$.next(false);
    });

    this.audio.addEventListener('pause', () => {
      console.log('⏸️  AudioService: Audio paused');
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('ended', () => {
      console.log('🔄 AudioService: Audio ended (will loop)');
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('error', (e) => {
      console.error('❌ AudioService: Audio error:', e);
    });

    this.audio.addEventListener('loadstart', () => {
      console.log('📥 AudioService: Loading audio...');
    });

    this.audio.addEventListener('canplay', () => {
      console.log('✅ AudioService: Audio can play');
    });

    // Default: NOT muted on initialization
    console.log('🎵 AudioService: Setting default muted state to FALSE');
    this.isMuted$.next(false);

    // Restore muted state from localStorage if available
    const savedMutedState = localStorage.getItem('wedding_audio_muted');
    console.log('🎵 AudioService: Saved muted state from localStorage:', savedMutedState);

    if (savedMutedState !== null) {
      const muted = JSON.parse(savedMutedState);
      console.log('🎵 AudioService: Restoring saved muted state:', muted);
      this.isMuted$.next(muted);

      // If not muted, try to play immediately
      if (!muted) {
        console.log('🎵 AudioService: Not muted, attempting to play immediately');
        this.playAudioImmediately();
      }
    } else {
      // Default: auto-play on first load
      console.log('🎵 AudioService: No saved state, attempting auto-play');
      this.playAudioImmediately();
    }
  }

  private playAudioImmediately() {
    if (!this.audio || this.autoplayAttempted) {
      console.log('🎵 AudioService: Skipping autoplay (already attempted or no audio)');
      return;
    }
    this.autoplayAttempted = true;

    setTimeout(() => {
      if (this.audio) {
        console.log('🎵 AudioService: Attempting to play audio...');
        this.audio.play()
          .then(() => {
            console.log('✅ AudioService: Audio playing successfully!');
          })
          .catch(err => {
            console.warn('⚠️  AudioService: Autoplay blocked by browser:', err.message);
            console.log('⚠️  AudioService: Will play on user interaction');
          });
      }
    }, 500);
  }

  toggleAudio() {
    if (!this.audio) return;

    const currentMutedState = this.isMuted$.value;
    console.log('🔊 AudioService: Toggle audio called. Current muted:', currentMutedState);

    if (currentMutedState) {
      // Unmute and play
      console.log('🔊 AudioService: Unmuting and playing...');
      this.audio.play()
        .then(() => console.log('✅ AudioService: Play successful'))
        .catch(err => {
          console.warn('⚠️  AudioService: Play error:', err);
        });
      this.isMuted$.next(false);
    } else {
      // Mute and pause
      console.log('🔇 AudioService: Muting and pausing...');
      this.audio.pause();
      this.isMuted$.next(true);
    }

    // Save state to localStorage
    const newState = !currentMutedState;
    console.log('💾 AudioService: Saving muted state to localStorage:', newState);
    localStorage.setItem('wedding_audio_muted', JSON.stringify(newState));
  }

  play() {
    if (!this.audio) {
      console.error('❌ AudioService: No audio element');
      return;
    }
    console.log('▶️  AudioService: Play method called');
    this.audio.play()
      .then(() => {
        console.log('✅ AudioService: Play successful');
        this.isMuted$.next(false);
      })
      .catch(err => {
        console.warn('⚠️  AudioService: Play error:', err);
      });
    localStorage.setItem('wedding_audio_muted', 'false');
  }

  pause() {
    if (!this.audio) {
      console.error('❌ AudioService: No audio element');
      return;
    }
    console.log('⏸️  AudioService: Pause method called');
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
