import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface GuestResponse {
  guestName: string;
  eventId: number;
  foodPreference: string | null;
  createdAt: string;
}

interface EventGroupResponse {
  eventId: number;
  eventName: string;
  attendees: Array<{ name: string; food: string | null }>;
  stats: {
    totalAttending: number;
    vegetarian: number;
    nonVegetarian: number;
    vegan: number;
  };
}

interface EventGroup {
  eventId: number;
  eventName: string;
  guests: GuestResponse[];
  attendingCount: number;
  declinedCount: number;
}

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="list-wrapper" [@fadeIn]>
      <!-- Password Protection -->
      <div *ngIf="!isAuthenticated" class="password-section">
        <div class="password-card">
          <h2>Guest List</h2>
          <p>Enter password to view the guest list</p>

          <div class="form-group">
            <input
              type="password"
              [(ngModel)]="password"
              placeholder="Enter password"
              (keyup.enter)="authenticateWithPassword()"
              class="password-input"
            >
          </div>

          <button (click)="authenticateWithPassword()" class="auth-button" [disabled]="isLoading">
            {{ isLoading ? 'Verifying...' : 'View List' }}
          </button>

          <div *ngIf="error" class="error-message">{{ error }}</div>
        </div>
      </div>

      <!-- Guest List Content -->
      <div *ngIf="isAuthenticated" class="list-content">
        <div class="list-header">
          <h1>Wedding Guest List</h1>
          <button (click)="logout()" class="logout-button">Logout</button>
        </div>

        <!-- Stats -->
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-number">{{ totalGuests }}</div>
            <div class="stat-label">Total Responses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ attendingCount }}</div>
            <div class="stat-label">Attending</div>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="applyFilters()"
            placeholder="Search by guest name..."
            class="search-input"
          >
          <select [(ngModel)]="filterFood" (ngModelChange)="applyFilters()" class="filter-select">
            <option value="">All Food Preferences</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="nonVegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <!-- Events Section (Grouped) -->
        <div class="events-section">
          <div class="event-group" *ngFor="let eventGroup of eventGroups">
            <div class="event-header">
              <h3>{{ eventGroup.eventName }}</h3>
              <div class="event-stats">
                <span class="event-stat attending">✓ {{ eventGroup.attendingCount }} Attending</span>
              </div>
            </div>

            <div class="table-container">
              <table class="guests-table">
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Food Preference</th>
                    <th>RSVP Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let guest of eventGroup.guests">
                    <td>{{ guest.guestName }}</td>
                    <td>{{ guest.foodPreference ? (guest.foodPreference | titlecase) : '—' }}</td>
                    <td>{{ guest.createdAt | date: 'MMM d, yyyy' }}</td>
                  </tr>
                </tbody>
              </table>

              <div *ngIf="eventGroup.guests.length === 0" class="no-results">
                No guests for this event.
              </div>
            </div>
          </div>

          <div *ngIf="eventGroups.length === 0" class="no-results">
            No events found matching your filters.
          </div>
        </div>

        <!-- Export Button -->
        <div class="export-section">
          <button (click)="exportToCSV()" class="export-button">📥 Export to CSV</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 100%);
      padding: 40px 20px;
    }

    /* Password Section */
    .password-section {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .password-card {
      background: white;
      border: 2px solid #d4af37;
      border-radius: 12px;
      padding: 60px 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .password-card h2 {
      font-family: 'Georgia', serif;
      font-size: 32px;
      color: #7a9d5d;
      margin: 0 0 10px 0;
    }

    .password-card p {
      color: #999;
      font-size: 14px;
      margin: 0 0 30px 0;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .password-input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #d4af37;
      border-radius: 6px;
      font-size: 14px;
      font-family: 'Georgia', serif;
    }

    .password-input:focus {
      outline: none;
      border-color: #7a9d5d;
      box-shadow: 0 0 0 3px rgba(122, 157, 93, 0.1);
    }

    .auth-button {
      width: 100%;
      padding: 12px;
      background: #7a9d5d;
      color: white;
      border: none;
      border-radius: 6px;
      font-family: 'Georgia', serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .auth-button:hover:not(:disabled) {
      background: #6a8d4d;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(122, 157, 93, 0.3);
    }

    .auth-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      margin-top: 15px;
      padding: 10px 15px;
      background: #ffebee;
      color: #c62828;
      border-radius: 6px;
      font-size: 13px;
    }

    /* List Content */
    .list-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      h1 {
        font-family: 'Georgia', serif;
        font-size: 36px;
        color: #7a9d5d;
        margin: 0;
      }
    }

    .logout-button {
      padding: 10px 20px;
      background: transparent;
      color: #7a9d5d;
      border: 2px solid #7a9d5d;
      border-radius: 6px;
      font-family: 'Georgia', serif;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-button:hover {
      background: #7a9d5d;
      color: white;
    }

    /* Stats */
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      border: 1px solid #d4af37;
      border-radius: 8px;
      padding: 20px;
      text-align: center;

      .stat-number {
        font-size: 32px;
        font-weight: bold;
        color: #d4af37;
        margin-bottom: 5px;
      }

      .stat-label {
        font-family: 'Georgia', serif;
        font-size: 13px;
        color: #7a9d5d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    /* Filters */
    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
      flex-wrap: wrap;

      .search-input,
      .filter-select {
        flex: 1;
        min-width: 150px;
        padding: 10px 12px;
        border: 1px solid #d4af37;
        border-radius: 6px;
        font-family: 'Georgia', serif;
        font-size: 13px;

        &:focus {
          outline: none;
          border-color: #7a9d5d;
          box-shadow: 0 0 0 3px rgba(122, 157, 93, 0.1);
        }
      }
    }

    /* Table */
    .table-container {
      background: white;
      border: 1px solid #d4af37;
      border-radius: 8px;
      overflow-x: auto;
      margin-bottom: 30px;
    }

    .guests-table {
      width: 100%;
      border-collapse: collapse;
    }

    .guests-table thead {
      background: rgba(122, 157, 93, 0.05);
      border-bottom: 2px solid #d4af37;
    }

    .guests-table thead th {
      padding: 15px;
      text-align: left;
      font-family: 'Georgia', serif;
      font-size: 12px;
      color: #7a9d5d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .guests-table tbody tr {
      border-bottom: 1px solid #e8e4db;
      transition: background 0.3s ease;
    }

    .guests-table tbody tr:hover {
      background: rgba(212, 175, 55, 0.05);
    }

    .guests-table tbody tr.declined {
      opacity: 0.7;
    }

    .guests-table tbody td {
      padding: 12px 15px;
      font-size: 13px;
      color: #333;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-badge.attending {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .status-badge.declined {
      background: #ffebee;
      color: #c62828;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #999;
      font-style: italic;
    }

    /* Export */
    .export-section {
      text-align: center;
    }

    .export-button {
      padding: 12px 30px;
      background: #7a9d5d;
      color: white;
      border: none;
      border-radius: 6px;
      font-family: 'Georgia', serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .export-button:hover {
      background: #6a8d4d;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(122, 157, 93, 0.3);
    }

    /* Events Section */
    .events-section {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin-bottom: 30px;
    }

    .event-group {
      background: white;
      border: 1px solid #d4af37;
      border-radius: 8px;
      overflow: hidden;
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(122, 157, 93, 0.05);
      border-bottom: 2px solid #d4af37;
      padding: 20px;
    }

    .event-header h3 {
      font-family: 'Georgia', serif;
      font-size: 20px;
      color: #7a9d5d;
      margin: 0;
    }

    .event-stats {
      display: flex;
      gap: 20px;
    }

    .event-stat {
      font-size: 13px;
      font-weight: 600;
    }

    .event-stat.attending {
      color: #2e7d32;
    }

    .event-stat.declined {
      color: #c62828;
    }

    @media (max-width: 768px) {
      .list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }

      .filters {
        flex-direction: column;
      }

      .search-input,
      .filter-select {
        min-width: 100%;
      }

      .guests-table {
        font-size: 12px;
      }

      .guests-table th,
      .guests-table td {
        padding: 10px 8px;
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
export class GuestListComponent implements OnInit {
  isAuthenticated = false;
  password = '';
  isLoading = false;
  error = '';

  guests: GuestResponse[] = [];
  eventGroups: EventGroup[] = [];

  searchQuery = '';
  filterStatus = '';
  filterFood = '';

  totalGuests = 0;
  attendingCount = 0;
  declinedCount = 0;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.applyFilters();
  }

  authenticateWithPassword() {
    if (!this.password.trim()) {
      this.error = 'Please enter a password';
      return;
    }

    this.isLoading = true;
    this.error = '';

    // Simple client-side check (in production, verify on backend)
    if (this.password === 'Kurapati') {
      this.isLoading = false;
      this.isAuthenticated = true;
      this.fetchGuestList();
    } else {
      this.isLoading = false;
      this.error = 'Incorrect password. Please try again.';
      this.password = '';
    }
  }

  fetchGuestList() {
    const url = `${this.apiUrl}/rsvps/list`;
    console.log('Attempting to fetch guest list from:', url);

    this.http.get<{ success: boolean; events: EventGroupResponse[] }>(url).subscribe({
      next: (response) => {
        if (response?.events) {
          this.guests = response.events.flatMap(event =>
            event.attendees.map(attendee => ({
              guestName: attendee.name,
              eventId: event.eventId,
              foodPreference: attendee.food,
              createdAt: new Date().toISOString()
            }))
          );
          console.log('Guest list fetched successfully:', this.guests.length, 'guests');
          this.updateStats();
          this.applyFilters();
        }
      },
      error: (error) => {
        console.error('Error fetching guest list:', error);
        const errorMessage = error?.error?.message || error?.message || 'Failed to fetch guest list. Please try again.';
        this.error = errorMessage;
        this.isAuthenticated = false;
      }
    });
  }

  updateStats() {
    this.totalGuests = this.guests.length;
    this.attendingCount = this.guests.length;
    this.declinedCount = 0;
  }

  applyFilters() {
    const filteredGuests = this.guests.filter(guest => {
      const matchesSearch = !this.searchQuery ||
        guest.guestName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFood = !this.filterFood || guest.foodPreference === this.filterFood;

      return matchesSearch && matchesFood;
    });

    // Group by eventId
    const groupMap = new Map<number, GuestResponse[]>();
    const eventNames: { [key: number]: string } = {
      1: 'Haldi & Mehendi',
      2: 'Pellikuthuru',
      3: 'Pellikoduku',
      4: 'Wedding Ceremony',
      5: 'Reception'
    };

    filteredGuests.forEach(guest => {
      if (!groupMap.has(guest.eventId)) {
        groupMap.set(guest.eventId, []);
      }
      groupMap.get(guest.eventId)!.push(guest);
    });

    // Create event groups
    this.eventGroups = Array.from(groupMap.entries()).map(([eventId, guests]) => ({
      eventId,
      eventName: eventNames[eventId],
      guests,
      attendingCount: guests.length,
      declinedCount: 0
    }));

    // Sort events by ID
    this.eventGroups.sort((a, b) => a.eventId - b.eventId);
  }

  exportToCSV() {
    const eventNames: { [key: number]: string } = {
      1: 'Haldi & Mehendi',
      2: 'Pellikuthuru',
      3: 'Pellikoduku',
      4: 'Wedding Ceremony',
      5: 'Reception'
    };

    const headers = ['Guest Name', 'Event', 'Food Preference', 'Date'];
    const rows = this.guests.map(guest => [
      guest.guestName,
      eventNames[guest.eventId],
      guest.foodPreference || '—',
      new Date(guest.createdAt).toLocaleDateString()
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `guest-list-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }

  logout() {
    this.isAuthenticated = false;
    this.password = '';
    this.error = '';
    this.guests = [];
  //  this.filteredGuests = [];
  }
}
