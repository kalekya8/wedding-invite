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
    this.prefetchAudio();
  }

  private prefetchAudio() {
    if (this.audio) {
      this.audio.load();
    }
  }

  private initializeAudio() {
    if (typeof document === 'undefined') return;

    const audioPath = '/assets/audio/radha-tipparaa.mp3';
    this.audio = new Audio(audioPath);

    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    this.audio.addEventListener('loadstart', () => {
    });

    this.audio.addEventListener('loadedmetadata', () => {
    });

    this.audio.addEventListener('loadeddata', () => {
    });

    this.audio.addEventListener('canplay', () => {
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying$.next(true);
      this.isMuted$.next(false);
    });

    this.audio.addEventListener('playing', () => {
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying$.next(false);
      this.isMuted$.next(true);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('error', () => {
    });

    this.isMuted$.next(false);
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
    if (!this.audio) {
      return;
    }

    const currentMutedState = this.isMuted$.value;

    if (currentMutedState) {
      this.play();
    } else {
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

  forceUnmute() {
    this.isMuted$.next(false);
  }

  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
