import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_VENUE } from '../../../models/wedding.model';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto text-center space-y-8">
      <div>
        <h2 class="text-4xl md:text-5xl text-sage-dark mb-4" [style.fontFamily]="'Cormorant Garamond'">
          Venue
        </h2>
        <p class="text-sage-700 text-lg" [style.fontFamily]="'Lora'">{{ venue.name }}</p>
      </div>

      <div class="space-y-4">
        <div class="flex items-start justify-center gap-3 text-sage-800">
          <span class="text-gold text-xl mt-1">📍</span>
          <div class="text-left" [style.fontFamily]="'Lora'">
            <p>{{ venue.address }}</p>
          </div>
        </div>

        <!-- Google Maps Embed -->
        <div class="w-full h-96 rounded-lg shadow-lg overflow-hidden border-2 border-sage-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.1234567890!2d-93.7!3d41.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ee3d1b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2s3014%20Scott%20St%2C%20New%20Virginia%2C%20IA%2050210!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style="border:0"
            allowFullscreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map">
          </iframe>
        </div>

        <!-- Navigate Button -->
        <a [href]="venue.mapsUrl"
           target="_blank"
           rel="noopener noreferrer"
           class="inline-block px-8 py-3 bg-gold hover:bg-gold-dark text-cream font-600 rounded-lg shadow-md transition-all duration-300"
           [style.fontFamily]="'Montserrat'"
           [style.boxShadow]="'0 4px 20px rgba(200, 162, 74, 0.25)'">
          Navigate with Google Maps
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class LocationComponent {
  venue = WEDDING_VENUE;
}
