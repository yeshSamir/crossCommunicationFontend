import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TicketResponse} from "../model/ticket.model";


@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketBaseUrl = 'http://localhost:8082/ticket'; // Your backend URL

  constructor(private http: HttpClient) {}

  getTickets(): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.ticketBaseUrl}/fetchTickets`, null);
  }

  // Fetch related tickets based on ticket ID
  // Fetch ticket details by ID
  getTicketDetails(ticketId: string): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.ticketBaseUrl}/${ticketId}`);
  }

  // Create a new ticket
  createTicket(ticketData: any): Observable<any> {
    return this.http.post<any>(`${this.ticketBaseUrl}/create`, ticketData);
  }
}
