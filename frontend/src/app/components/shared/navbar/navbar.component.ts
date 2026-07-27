import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="isScrolled" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
         [style.backgroundColor]="isScrolled ? 'rgba(246, 241, 231, 0.8)' : 'transparent'"
         [style.backdropFilter]="isScrolled ? 'blur(10px)' : 'none'"
         [style.boxShadow]="isScrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <button (click)="scrollToSection('hero')"
                    class="text-2xl font-bold transition-colors"
                    [style.color]="'#C8A24A'"
                    [style.fontFamily]="'Montserrat'">
              L & V
            </button>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <button *ngFor="let item of navItems"
                    (click)="scrollToSection(item.id)"
                    [class.active]="activeSection === item.id"
                    class="font-600 tracking-wide transition-colors relative group text-sm"
                    [style.color]="activeSection === item.id ? '#C8A24A' : '#5A6850'"
                    [style.fontFamily]="'Montserrat'">
              {{ item.label }}
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform transition-transform duration-300 origin-left"
                    [style.backgroundColor]="'#C8A24A'"
                    [style.transform]="activeSection === item.id ? 'scaleX(1)' : 'scaleX(0) group-hover:scaleX(1)'"></span>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      --font-montserrat: 'Montserrat', sans-serif;
    }

    nav.scrolled {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    button.active span {
      transform: scaleX(1);
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  activeSection = 'hero';

  navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Countdown', id: 'countdown' },
    { label: 'Events', id: 'events' },
    { label: 'Location', id: 'location' },
    { label: 'RSVP', id: 'rsvp' }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
    this.updateActiveSection();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
    }
  }

  private updateActiveSection() {
    const sections = this.navItems.map(item => item.id);
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }
}
