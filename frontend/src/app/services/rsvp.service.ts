import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GuestEventResponse {
  eventId: string;
  guestName: string;
  foodPreference?: string;
}

export interface SubmitRsvpRequest {
  eventResponses: GuestEventResponse[];
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

  getGuestList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getAllResponses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
