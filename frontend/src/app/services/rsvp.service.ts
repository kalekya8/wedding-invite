import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GuestEventResponse {
  eventId: string;
  guestId?: string;
  guestName: string;
  attendanceStatus: string;
  foodPreference?: string;
  dietaryRestrictions?: string;
  specialRequests?: string;
}

export interface SubmitRsvpRequest {
  invitationCode: string;
  eventResponses: GuestEventResponse[];
  messageToCouple?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private apiUrl = `${environment.apiUrl}/rsvps`;

  constructor(private http: HttpClient) {}

  submitRsvp(request: SubmitRsvpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, request);
  }

  getRsvp(editToken: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/manage/${editToken}`);
  }

  updateRsvp(editToken: string, request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/manage/${editToken}`, request);
  }
}
