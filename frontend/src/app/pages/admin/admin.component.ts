import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage Wedding Events and Data</p>
      </div>

      <div class="admin-grid">
        <!-- Seed Database Section -->
        <div class="admin-card">
          <div class="card-header">
            <h2>📊 Initialize Database</h2>
            <p>Seed the database with all wedding events and venue information</p>
          </div>

          <div class="card-content">
            <button
              class="btn btn-primary"
              (click)="seedDatabase()"
              [disabled]="loading"
            >
              {{ loading ? 'Seeding...' : 'Seed Database' }}
            </button>

            <div *ngIf="seedMessage" [ngClass]="seedMessageClass" class="message">
              {{ seedMessage }}
            </div>
          </div>
        </div>

        <!-- Add Event Section -->
        <div class="admin-card">
          <div class="card-header">
            <h2>➕ Add New Event</h2>
            <p>Create a new wedding event</p>
          </div>

          <div class="card-content">
            <form (ngSubmit)="addEvent()" class="form">
              <div class="form-group">
                <label>Event Name *</label>
                <input
                  type="text"
                  [(ngModel)]="newEvent.name"
                  name="eventName"
                  placeholder="e.g., Rehearsal Dinner"
                  required
                >
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    [(ngModel)]="newEvent.date"
                    name="eventDate"
                    required
                  >
                </div>

                <div class="form-group">
                  <label>Time *</label>
                  <input
                    type="text"
                    [(ngModel)]="newEvent.time"
                    name="eventTime"
                    placeholder="e.g., Evening"
                    required
                  >
                </div>
              </div>

              <div class="form-group">
                <label>Dress Code</label>
                <input
                  type="text"
                  [(ngModel)]="newEvent.dressCode"
                  name="dressCode"
                  placeholder="e.g., Formal Attire"
                >
              </div>

              <div class="form-group">
                <label>Description</label>
                <textarea
                  [(ngModel)]="newEvent.description"
                  name="description"
                  placeholder="Event description"
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-success" [disabled]="loading">
                {{ loading ? 'Adding...' : 'Add Event' }}
              </button>

              <div *ngIf="eventMessage" [ngClass]="eventMessageClass" class="message">
                {{ eventMessage }}
              </div>
            </form>
          </div>
        </div>

        <!-- Events List Section -->
        <div class="admin-card full-width">
          <div class="card-header">
            <h2>📋 Events List</h2>
            <button class="btn btn-small" (click)="fetchEvents()" [disabled]="loading">
              🔄 Refresh
            </button>
          </div>

          <div class="card-content">
            <div *ngIf="events.length > 0" class="events-table">
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Dress Code</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let event of events">
                    <td>{{ event.name }}</td>
                    <td>{{ event.eventDate | date: 'MMM dd, yyyy' }}</td>
                    <td>{{ event.startTime }}</td>
                    <td>{{ event.dressCode || 'Not specified' }}</td>
                    <td>
                      <span class="badge" [ngClass]="{ active: event.isActive, inactive: !event.isActive }">
                        {{ event.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div *ngIf="events.length === 0" class="no-data">
              No events found. Click "Seed Database" to create initial events.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .admin-header {
      text-align: center;
      margin-bottom: 50px;

      h1 {
        font-family: 'Georgia', serif;
        font-size: 36px;
        color: #7a9d5d;
        margin: 0 0 10px 0;
      }

      p {
        font-family: 'Georgia', serif;
        color: #666;
        font-size: 16px;
        margin: 0;
      }
    }

    .admin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;

      .full-width {
        grid-column: 1 / -1;
      }
    }

    .admin-card {
      background: #faf8f3;
      border: 1px solid #d4af37;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    }

    .card-header {
      background: linear-gradient(135deg, #7a9d5d 0%, #6a8d4d 100%);
      color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h2 {
        font-family: 'Georgia', serif;
        font-size: 20px;
        margin: 0 0 5px 0;
      }

      p {
        font-size: 13px;
        margin: 0;
        opacity: 0.9;
      }
    }

    .card-content {
      padding: 25px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;

      label {
        font-family: 'Georgia', serif;
        font-size: 13px;
        color: #7a9d5d;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
        letter-spacing: 0.5px;
      }

      input, textarea {
        padding: 10px 12px;
        border: 1px solid #d4af37;
        border-radius: 4px;
        font-family: 'Georgia', serif;
        font-size: 14px;
        color: #333;

        &:focus {
          outline: none;
          border-color: #7a9d5d;
          box-shadow: 0 0 0 2px rgba(122, 157, 93, 0.1);
        }
      }

      textarea {
        resize: vertical;
        min-height: 80px;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .message {
      padding: 12px;
      border-radius: 4px;
      font-size: 13px;
      margin-top: 10px;
      font-family: 'Georgia', serif;

      &.success {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #c8e6c9;
      }

      &.error {
        background: #ffebee;
        color: #c62828;
        border: 1px solid #ffcdd2;
      }

      &.info {
        background: #e3f2fd;
        color: #1565c0;
        border: 1px solid #bbdefb;
      }
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      font-family: 'Georgia', serif;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &.btn-primary {
        background: #7a9d5d;
        color: white;

        &:hover:not(:disabled) {
          background: #6a8d4d;
        }
      }

      &.btn-success {
        background: #4caf50;
        color: white;
        width: 100%;

        &:hover:not(:disabled) {
          background: #388e3c;
        }
      }

      &.btn-small {
        padding: 6px 12px;
        font-size: 12px;
      }
    }

    .events-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Georgia', serif;

        thead {
          background: rgba(122, 157, 93, 0.1);

          th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #7a9d5d;
            border-bottom: 2px solid #d4af37;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid #e8e4db;

            &:hover {
              background: rgba(122, 157, 93, 0.05);
            }

            td {
              padding: 12px;
              color: #333;
              font-size: 14px;
            }
          }
        }
      }
    }

    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;

      &.active {
        background: #e8f5e9;
        color: #2e7d32;
      }

      &.inactive {
        background: #ffebee;
        color: #c62828;
      }
    }

    .no-data {
      text-align: center;
      padding: 30px;
      color: #999;
      font-family: 'Georgia', serif;
    }

    @media (max-width: 768px) {
      .admin-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .card-header {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  loading = false;
  seedMessage = '';
  seedMessageClass = '';
  eventMessage = '';
  eventMessageClass = '';

  events: any[] = [];

  newEvent = {
    name: '',
    date: '',
    time: '',
    dressCode: '',
    description: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEvents();
  }

  seedDatabase() {
    this.loading = true;
    this.seedMessage = '';

    this.http.post(`${environment.apiUrl}/admin/seed-data`, {}).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.seedMessage = response.message;
        this.seedMessageClass = 'success';
        this.fetchEvents();
      },
      error: (error: any) => {
        this.loading = false;
        this.seedMessage = error.error?.message || 'Error seeding database';
        this.seedMessageClass = 'error';
      }
    });
  }

  addEvent() {
    if (!this.newEvent.name || !this.newEvent.date || !this.newEvent.time) {
      this.eventMessage = 'Please fill in all required fields';
      this.eventMessageClass = 'error';
      return;
    }

    this.loading = true;
    this.eventMessage = '';

    const eventData = {
      name: this.newEvent.name,
      eventDate: new Date(this.newEvent.date),
      startTime: this.newEvent.time,
      dressCode: this.newEvent.dressCode || '',
      description: this.newEvent.description || '',
      slug: this.newEvent.name.toLowerCase().replace(/\s+/g, '-'),
      displayOrder: this.events.length + 1,
      isActive: true
    };

    this.http.post(`${environment.apiUrl}/events`, eventData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.eventMessage = 'Event added successfully!';
        this.eventMessageClass = 'success';
        this.resetForm();
        this.fetchEvents();
      },
      error: (error: any) => {
        this.loading = false;
        this.eventMessage = error.error?.message || 'Error adding event';
        this.eventMessageClass = 'error';
      }
    });
  }

  fetchEvents() {
    this.http.get(`${environment.apiUrl}/events`).subscribe({
      next: (response: any) => {
        this.events = response.events || [];
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  private resetForm() {
    this.newEvent = {
      name: '',
      date: '',
      time: '',
      dressCode: '',
      description: ''
    };
  }
}
