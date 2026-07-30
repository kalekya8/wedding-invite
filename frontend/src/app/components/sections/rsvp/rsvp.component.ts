import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { RsvpService } from '../../../services/rsvp.service';

interface EventOption {
  id: string;
  name: string;
  eventId: string;
}

interface Guest {
  id: string;
  name: string;
  foodPreference: string;
}

interface RsvpFormData {
  name: string;
  email: string;
  events: string[];
  foodPreference: string;
  messageToCouple: string;
  guests: Guest[];
}

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rsvp-section" [@fadeIn]>
      <div class="rsvp-content">
        <h2 class="section-title">Let Us Know You're Coming</h2>
        <p class="rsvp-subtitle">Please RSVP by August 15, 2026</p>

        <div class="rsvp-card">
          <form (ngSubmit)="submitRsvp()" class="rsvp-form" *ngIf="!submitted">
            <!-- Primary Guest Section -->
            <div class="section-header">
              <h3>Primary Guest</h3>
            </div>

            <!-- Name & Email Row -->
            <div class="form-row">
              <div class="form-field">
                <label>Your Name <span class="required">*</span></label>
                <input
                  type="text"
                  [(ngModel)]="formData.name"
                  name="name"
                  placeholder="Full name"
                  required
                >
              </div>
              <div class="form-field">
                <label>Email</label>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="your@email.com"
                >
              </div>
            </div>

            <!-- Events Multi-Select -->
            <div class="form-row">
              <div class="form-field full-width">
                <label>Which events will you attend? <span class="required">*</span></label>
                <div class="checkbox-group">
                  <div class="checkbox-item" *ngFor="let event of eventOptions">
                    <input
                      type="checkbox"
                      [(ngModel)]="event.selected"
                      [name]="'event_' + event.id"
                      (change)="updateSelectedEvents()"
                      [id]="'event_' + event.id"
                    >
                    <label [for]="'event_' + event.id" class="checkbox-label">
                      {{ event.name }}
                    </label>
                  </div>
                </div>
                <span class="helper-text" *ngIf="formData.events.length > 0">
                  {{ formData.events.length }} event(s) selected
                </span>
              </div>
            </div>

            <!-- Food Preference -->
            <div class="form-row" *ngIf="formData.events.length > 0">
              <div class="form-field">
                <label>Your Food Preference <span class="required">*</span></label>
                <select [(ngModel)]="formData.foodPreference" name="foodPreference" required>
                  <option value="">Select...</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="nonVegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>

            <!-- Additional Guests Section -->
            <div class="additional-guests-section" *ngIf="formData.events.length > 0">
              <div class="section-header">
                <h3>Additional Guests</h3>
                <span class="guest-count" *ngIf="formData.guests.length > 0">{{ formData.guests.length }} guest(s)</span>
              </div>

              <div class="guest-card" *ngFor="let guest of formData.guests; let i = index">
                <div class="guest-header">
                  <div class="guest-number">Guest {{ i + 2 }}</div>
                  <button type="button" class="remove-btn" (click)="removeGuest(i)" title="Remove guest">
                    ✕
                  </button>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label>Guest Name <span class="required">*</span></label>
                    <input
                      type="text"
                      [(ngModel)]="guest.name"
                      [name]="'guest_name_' + guest.id"
                      placeholder="Full name"
                      required
                    >
                  </div>
                  <div class="form-field">
                    <label>Food Preference <span class="required">*</span></label>
                    <select [(ngModel)]="guest.foodPreference" [name]="'guest_food_' + guest.id" required>
                      <option value="">Select...</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="nonVegetarian">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Add Guest Button -->
              <button type="button" class="add-guest-btn" (click)="addGuest()" *ngIf="formData.guests.length < 4">
                + Add Guest
              </button>
            </div>

            <!-- Message -->
            <div class="form-row">
              <div class="form-field full-width">
                <label>Message to the Couple (Optional)</label>
                <textarea
                  [(ngModel)]="formData.messageToCouple"
                  name="message"
                  placeholder="Share your wishes and blessings..."
                ></textarea>
              </div>
            </div>

            <!-- Error Message -->
            <div *ngIf="error" class="error-message">{{ error }}</div>

            <!-- Submit Button -->
            <button type="submit" class="submit-button" [disabled]="isSubmitting || formData.events.length === 0 || !isFormValid()">
              {{ isSubmitting ? 'Submitting...' : 'Confirm RSVP' }}
            </button>
          </form>

          <!-- Success Message -->
          <div *ngIf="submitted" class="success-section" [@fadeIn]>
            <div class="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>We've received your RSVP. We look forward to celebrating with you!</p>
            <p class="events-confirmed">Events confirmed: {{ formData.events.length }}</p>
            <p class="guests-confirmed">Total guests: {{ formData.guests.length + 1 }}</p>
            <button class="reset-button" (click)="resetForm()">Submit Another RSVP</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rsvp-section {
      width: 100%;
      padding: 80px 40px;
      background: linear-gradient(135deg, rgba(245, 241, 232, 0.5) 0%, rgba(250, 248, 243, 0.5) 100%);
    }

    .rsvp-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .section-title {
      font-family: 'Georgia', serif;
      font-size: 36px;
      color: #7a9d5d;
      text-align: center;
      margin: 0 0 15px 0;
      letter-spacing: 1px;
    }

    .rsvp-subtitle {
      font-family: 'Georgia', serif;
      font-size: 16px;
      color: #999;
      text-align: center;
      margin: 0 0 50px 0;
      font-style: italic;
    }

    .rsvp-card {
      background: rgba(250, 248, 243, 0.95);
      border: 2px solid #d4af37;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .rsvp-form {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 2px solid #d4af37;

      h3 {
        font-family: 'Georgia', serif;
        font-size: 18px;
        color: #7a9d5d;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .guest-count {
        font-family: 'Georgia', serif;
        font-size: 13px;
        color: #d4af37;
        font-weight: 600;
        background: rgba(122, 157, 93, 0.1);
        padding: 4px 12px;
        border-radius: 20px;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .form-field {
      display: flex;
      flex-direction: column;

      &.full-width {
        grid-column: 1 / -1;
      }

      label {
        font-family: 'Georgia', serif;
        font-size: 12px;
        color: #7a9d5d;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }

      .required {
        color: #d32f2f;
      }

      input, select, textarea {
        font-family: 'Georgia', serif;
        font-size: 14px;
        padding: 11px 12px;
        border: 1px solid #d4af37;
        border-radius: 6px;
        background: #faf8f3;
        color: #333;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #7a9d5d;
          box-shadow: 0 0 0 3px rgba(122, 157, 93, 0.1);
        }

        &::placeholder {
          color: #bbb;
        }
      }

      textarea {
        resize: vertical;
        min-height: 90px;
      }
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #faf8f3;
      padding: 15px;
      border-radius: 6px;
      border: 1px solid #e8e4db;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 10px;

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #7a9d5d;
        margin: 0;
        padding: 0;
        border: 1px solid #d4af37;
        border-radius: 4px;
      }

      .checkbox-label {
        font-family: 'Georgia', serif;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        margin: 0;
        text-transform: none;
        font-weight: 400;
      }
    }

    .helper-text {
      display: block;
      font-size: 12px;
      color: #7a9d5d;
      margin-top: 8px;
      font-style: italic;
    }

    .additional-guests-section {
      margin-top: 30px;
      padding-top: 25px;
      border-top: 2px solid #e8e4db;
    }

    .guest-card {
      background: rgba(212, 175, 55, 0.05);
      border: 1px solid #e8e4db;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
    }

    .guest-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .guest-number {
      font-family: 'Georgia', serif;
      font-size: 13px;
      color: #d4af37;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .remove-btn {
      background: #ffebee;
      color: #c62828;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: #c62828;
        color: white;
      }
    }

    .add-guest-btn {
      display: block;
      margin-top: 15px;
      padding: 10px 20px;
      background: transparent;
      color: #7a9d5d;
      border: 2px dashed #d4af37;
      border-radius: 6px;
      font-family: 'Georgia', serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(122, 157, 93, 0.05);
        border-color: #7a9d5d;
      }
    }

    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 12px 15px;
      border-radius: 6px;
      font-size: 13px;
      border-left: 4px solid #c62828;
    }

    .submit-button {
      padding: 13px 40px;
      background: #7a9d5d;
      color: #faf8f3;
      border: 2px solid #7a9d5d;
      border-radius: 6px;
      font-family: 'Georgia', serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      align-self: center;
      margin-top: 10px;

      &:hover:not(:disabled) {
        background: #6a8d4d;
        border-color: #6a8d4d;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(122, 157, 93, 0.3);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .success-section {
      text-align: center;
      padding: 40px 20px;
    }

    .success-icon {
      font-size: 60px;
      color: #4caf50;
      margin-bottom: 20px;
      animation: bounce 0.6s ease;
    }

    .success-section h3 {
      font-family: 'Georgia', serif;
      font-size: 28px;
      color: #7a9d5d;
      margin: 0 0 10px 0;
    }

    .success-section p {
      font-family: 'Georgia', serif;
      font-size: 14px;
      color: #666;
      margin: 0 0 5px 0;
    }

    .events-confirmed,
    .guests-confirmed {
      font-size: 13px !important;
      color: #4caf50;
      font-weight: 600;
      margin-top: 10px !important;
    }

    .reset-button {
      margin-top: 20px;
      padding: 10px 30px;
      background: transparent;
      color: #7a9d5d;
      border: 2px solid #7a9d5d;
      border-radius: 6px;
      font-family: 'Georgia', serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #7a9d5d;
        color: #faf8f3;
      }
    }

    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    @media (max-width: 768px) {
      .rsvp-section {
        padding: 60px 20px;
      }

      .rsvp-card {
        padding: 25px;
      }

      .section-title {
        font-size: 28px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RsvpComponent implements OnInit {
  eventOptions: (EventOption & { selected: boolean })[] = [];
  formData: RsvpFormData = {
    name: '',
    email: '',
    events: [],
    foodPreference: '',
    messageToCouple: '',
    guests: []
  };

  submitted = false;
  isSubmitting = false;
  error = '';
  invitationCode = 'LV2026';

  constructor(private rsvpService: RsvpService) {}

  ngOnInit() {
    this.initializeEvents();
  }

  private initializeEvents() {
    this.eventOptions = [
      { id: 'haldi', name: 'Haldi & Mehendi - 25 August', eventId: '1', selected: false },
      { id: 'pellikuthuru', name: 'Pellikuthuru - 26 August', eventId: '2', selected: false },
      { id: 'pellikoduku', name: 'Pellikoduku - 26 August', eventId: '3', selected: false },
      { id: 'ceremony', name: 'Wedding Ceremony - 27 August', eventId: '4', selected: false },
      { id: 'reception', name: 'Reception - 27 August', eventId: '5', selected: false }
    ];
  }

  updateSelectedEvents() {
    this.formData.events = this.eventOptions
      .filter(e => e.selected)
      .map(e => e.eventId);
  }

  addGuest() {
    if (this.formData.guests.length < 4) {
      this.formData.guests.push({
        id: `guest_${Date.now()}_${Math.random()}`,
        name: '',
        foodPreference: ''
      });
    }
  }

  removeGuest(index: number) {
    this.formData.guests.splice(index, 1);
  }

  isFormValid(): boolean {
    if (!this.formData.name.trim() || !this.formData.foodPreference) {
      return false;
    }

    for (const guest of this.formData.guests) {
      if (!guest.name.trim() || !guest.foodPreference) {
        return false;
      }
    }

    return true;
  }

  submitRsvp() {
    if (!this.formData.name.trim()) {
      this.error = 'Please enter your name';
      return;
    }

    if (this.formData.events.length === 0) {
      this.error = 'Please select at least one event';
      return;
    }

    if (!this.formData.foodPreference) {
      this.error = 'Please select your food preference';
      return;
    }

    for (let i = 0; i < this.formData.guests.length; i++) {
      const guest = this.formData.guests[i];
      if (!guest.name.trim()) {
        this.error = `Please enter guest ${i + 2}'s name`;
        return;
      }
      if (!guest.foodPreference) {
        this.error = `Please select food preference for guest ${i + 2}`;
        return;
      }
    }

    this.isSubmitting = true;
    this.error = '';

    const eventResponses: any[] = [];

    this.eventOptions
      .filter(e => e.selected)
      .forEach(e => {
        eventResponses.push({
          eventId: e.eventId,
          guestName: this.formData.name,
          foodPreference: this.formData.foodPreference
        });

        this.formData.guests.forEach(guest => {
          eventResponses.push({
            eventId: e.eventId,
            guestName: guest.name,
            foodPreference: guest.foodPreference
          });
        });
      });

    const payload = {
      eventResponses: eventResponses
    };

    this.rsvpService.submitRsvp(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
        console.log('RSVP submitted successfully');
      },
      error: (error: any) => {
        this.isSubmitting = false;
        this.error = error.error?.message || 'Failed to submit RSVP. Please try again.';
        console.error('RSVP submission error:', error);
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.formData = {
      name: '',
      email: '',
      events: [],
      foodPreference: '',
      messageToCouple: '',
      guests: []
    };
    this.eventOptions.forEach(e => e.selected = false);
    this.error = '';
  }
}
