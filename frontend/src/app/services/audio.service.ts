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
    console.log(`[${new Date().getTime()}] 🎵 AudioService constructor`);
    this.initializeAudio();
    this.setupUserInteractionListener();
    this.prefetchAudio();
  }

  private prefetchAudio() {
    console.log(`[${new Date().getTime()}] ⚡ Prefetching audio file`);
    if (this.audio) {
      this.audio.load();
      console.log(`[${new Date().getTime()}] ⚡ Audio load() called for prefetch`);
    }
  }

  private initializeAudio() {
    if (typeof document === 'undefined') return;

    console.log(`[${new Date().getTime()}] 🎵 Audio service constructor - initializing audio`);

    const audioPath = '/assets/audio/radha-tipparaa.mp3';
    console.log(`[${new Date().getTime()}] 🎵 Audio path set: ${audioPath}`);

    this.audio = new Audio(audioPath);
    console.log(`[${new Date().getTime()}] 🎵 Audio element created`);

    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    console.log(`[${new Date().getTime()}] 🎵 Audio properties set - preload: auto, volume: 0.5, loop: true`);

    this.audio.addEventListener('loadstart', () => {
      console.log(`[${new Date().getTime()}] 📥 Audio loadstart event`);
    });

    this.audio.addEventListener('loadedmetadata', () => {
      console.log(`[${new Date().getTime()}] 📊 Audio loadedmetadata event - duration: ${this.audio?.duration}s`);
    });

    this.audio.addEventListener('loadeddata', () => {
      console.log(`[${new Date().getTime()}] 📦 Audio loadeddata event`);
    });

    this.audio.addEventListener('canplay', () => {
      console.log(`[${new Date().getTime()}] ✅ Audio canplay event`);
    });

    this.audio.addEventListener('play', () => {
      console.log(`[${new Date().getTime()}] ▶️ Audio play event triggered`);
      this.isPlaying$.next(true);
      console.log(`[${new Date().getTime()}] ▶️ Setting isMuted$ to FALSE (audio playing)`);
      this.isMuted$.next(false);
    });

    this.audio.addEventListener('playing', () => {
      console.log(`[${new Date().getTime()}] 🎵 Audio playing event - actually started playing`);
    });

    this.audio.addEventListener('pause', () => {
      console.log(`[${new Date().getTime()}] ⏸️ Audio pause event`);
      this.isPlaying$.next(false);
      console.log(`[${new Date().getTime()}] ⏸️ Setting isMuted$ to TRUE (audio paused)`);
      this.isMuted$.next(true);
    });

    this.audio.addEventListener('ended', () => {
      console.log(`[${new Date().getTime()}] 🔄 Audio ended event`);
      this.isPlaying$.next(false);
    });

    this.audio.addEventListener('error', (e) => {
      console.error(`[${new Date().getTime()}] ❌ Audio error event:`, e);
    });

    this.isMuted$.next(false);
  }

  private setupUserInteractionListener() {
    if (typeof document === 'undefined') return;

    console.log(`[${new Date().getTime()}] 👆 Setting up user interaction listeners`);

    const playAudioOnInteraction = () => {
      console.log(`[${new Date().getTime()}] 👆 User interaction detected`);
      if (!this.userInteracted && !this.isMuted$.value) {
        console.log(`[${new Date().getTime()}] 👆 First interaction - playing audio`);
        this.userInteracted = true;
        this.play();
      }
      console.log(`[${new Date().getTime()}] 👆 Removing interaction listeners`);
      document.removeEventListener('click', playAudioOnInteraction);
      document.removeEventListener('scroll', playAudioOnInteraction);
      document.removeEventListener('touchstart', playAudioOnInteraction);
    };

    document.addEventListener('click', playAudioOnInteraction);
    document.addEventListener('scroll', playAudioOnInteraction);
    document.addEventListener('touchstart', playAudioOnInteraction);
  }

  toggleAudio() {
    console.log(`[${new Date().getTime()}] 🔄 toggleAudio() called`);
    if (!this.audio) {
      console.log(`[${new Date().getTime()}] ❌ No audio element in toggleAudio()`);
      return;
    }

    const currentMutedState = this.isMuted$.value;
    console.log(`[${new Date().getTime()}] 🔄 Current muted state: ${currentMutedState}`);

    if (currentMutedState) {
      console.log(`[${new Date().getTime()}] 🔄 Currently muted - unmuting and playing`);
      this.play();
    } else {
      console.log(`[${new Date().getTime()}] 🔄 Currently playing - muting and pausing`);
      this.pause();
    }
  }

  play() {
    console.log(`[${new Date().getTime()}] ▶️ play() method called`);

    if (!this.audio) {
      console.log(`[${new Date().getTime()}] ❌ No audio element in play()`);
      return;
    }

    console.log(`[${new Date().getTime()}] 🎯 Calling audio.play()`);
    this.audio.play()
      .then(() => {
        console.log(`[${new Date().getTime()}] ✅ audio.play() promise resolved - audio started`);
        this.isMuted$.next(false);
      })
      .catch((err) => {
        console.error(`[${new Date().getTime()}] ❌ audio.play() promise rejected:`, err.name, err.message);
      });

    localStorage.setItem('wedding_audio_muted', 'false');
  }

  pause() {
    console.log(`[${new Date().getTime()}] ⏸️ pause() method called`);
    console.trace('PAUSE STACK TRACE - WHO CALLED PAUSE?');

    if (!this.audio) {
      console.log(`[${new Date().getTime()}] ❌ No audio element in pause()`);
      return;
    }

    console.log(`[${new Date().getTime()}] 🔇 Calling audio.pause()`);
    this.audio.pause();
    console.log(`[${new Date().getTime()}] 🔇 Setting isMuted$ to TRUE in pause()`);
    this.isMuted$.next(true);
    localStorage.setItem('wedding_audio_muted', 'true');
  }

  setVolume(volume: number) {
    if (!this.audio) return;
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  forceUnmute() {
    console.log(`[${new Date().getTime()}] 🔊 forceUnmute() - ensuring audio is not muted`);
    this.isMuted$.next(false);
  }

  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
