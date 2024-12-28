import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ticket} from "../model/ticket.model";
import {ResponseModel} from "../model/response.model";

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketBaseUrl = 'http://localhost:8082/ticket'; // Your backend URL

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.ticketBaseUrl}/fetchTickets`, null);
  }
  // Fetch related tickets based on ticket ID
  // Fetch ticket details by ID
  getTicketDetails(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketBaseUrl}/${ticketId}`);
  }

  // Create a new ticket
  createTicket(ticketData: any): Observable<any> {
    return this.http.post<any>(`${this.ticketBaseUrl}/create`, ticketData);
  }
}
