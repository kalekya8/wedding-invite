import { Injectable, NgZone } from '@angular/core';

interface MusicNote {
  id: string;
  element: HTMLElement;
  startTime: number;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class MusicNotesService {
  private notes: Map<string, MusicNote> = new Map();
  private container: HTMLElement | null = null;
  private spawnInterval: any = null;
  private isPlaying = false;
  private audioButton: HTMLElement | null = null;

  private noteSymbols = ['♪', '♫', '♬'];
  private colors = ['#C8A24D', '#9AA68A', '#F7F2E8']; // Gold, Sage, Cream

  constructor(private ngZone: NgZone) {
    this.createContainer();
  }

  private createContainer() {
    if (typeof document === 'undefined') return;

    this.container = document.createElement('div');
    this.container.style.position = 'fixed';
    this.container.style.pointerEvents = 'none';
    this.container.style.zIndex = '9998';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    document.body.appendChild(this.container);
  }

  startPlaying(audioButtonElement?: HTMLElement) {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.audioButton = audioButtonElement || null;

    this.ngZone.runOutsideAngular(() => {
      this.spawnInterval = setInterval(() => {
        if (this.isPlaying) {
          this.spawnNote();
        }
      }, Math.random() * 300 + 400); // 400-700ms interval
    });
  }

  stopPlaying() {
    this.isPlaying = false;

    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = null;
    }

    // Clear all notes
    this.notes.forEach(note => {
      if (note.element.parentNode) {
        note.element.parentNode.removeChild(note.element);
      }
    });
    this.notes.clear();
  }

  private spawnNote() {
    if (!this.container || !this.audioButton) return;

    const noteId = `note_${Date.now()}_${Math.random()}`;
    const symbol = this.noteSymbols[Math.floor(Math.random() * this.noteSymbols.length)];
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const size = 14 + Math.random() * 10; // 14-24px
    const duration = 2000 + Math.random() * 1000; // 2-3 seconds

    const noteElement = document.createElement('div');
    noteElement.innerHTML = symbol;
    noteElement.style.position = 'fixed';
    noteElement.style.fontSize = size + 'px';
    noteElement.style.color = color;
    noteElement.style.opacity = '0.4';
    noteElement.style.fontWeight = 'bold';
    noteElement.style.fontFamily = 'Georgia, serif';
    noteElement.style.pointerEvents = 'none';
    noteElement.style.userSelect = 'none';
    noteElement.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    noteElement.style.willChange = 'transform, opacity';

    // Position near audio button
    const buttonRect = this.audioButton.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2 + (Math.random() - 0.5) * 40;
    const startY = buttonRect.top + buttonRect.height / 2;

    noteElement.style.left = startX + 'px';
    noteElement.style.top = startY + 'px';

    this.container!.appendChild(noteElement);

    const note: MusicNote = {
      id: noteId,
      element: noteElement,
      startTime: Date.now(),
      duration: duration
    };

    this.notes.set(noteId, note);

    // Animate the note
    this.animateNote(noteId, duration);
  }

  private animateNote(noteId: string, duration: number) {
    const note = this.notes.get(noteId);
    if (!note) return;

    const startX = parseFloat(note.element.style.left);
    const startY = parseFloat(note.element.style.top);
    const driftX = (Math.random() - 0.5) * 40; // Horizontal drift
    const endY = startY - 80; // Float upward

    let startTime = Date.now();

    const animate = () => {
      if (!this.notes.has(noteId)) return;

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + driftX * easeProgress;
      const currentY = startY + (endY - startY) * easeProgress;
      const currentOpacity = 0.4 * (1 - progress);

      note.element.style.left = currentX + 'px';
      note.element.style.top = currentY + 'px';
      note.element.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Remove note
        if (note.element.parentNode) {
          note.element.parentNode.removeChild(note.element);
        }
        this.notes.delete(noteId);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(animate);
    });
  }

  destroy() {
    this.stopPlaying();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
