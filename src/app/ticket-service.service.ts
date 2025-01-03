import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TicketResponse} from "../model/ticket.model";
import {ResponseModel} from "../model/response.model";
import {FetchTicketsRequestModule} from "../model/fetchSuggestedTicketsRequestModule.module";
import {LocationResponse} from "../model/location.module";
import {ContactDetailsModel} from "../model/contactDetails.model";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private ticketBaseUrl = environment.ticketBaseUrl;

  constructor(private http: HttpClient) {}

  getTickets(): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.ticketBaseUrl}/fetchTickets`, null);
  }

  // Create a new ticket
  submitTicket(ticketData: any): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.ticketBaseUrl}/create`, ticketData);
  }

  // Fetch related tickets based on ticket ID
  // Fetch ticket details by ID

  getTicketDetails(fetchTicketsRequestModule: FetchTicketsRequestModule): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.ticketBaseUrl}/fetchTicketsById`, fetchTicketsRequestModule);
  }

  requestContactDetailsFromSuggestedListId(suggestedTicketId: string | undefined): Observable<ContactDetailsModel> {
    console.log(typeof suggestedTicketId);
    return this.http.post<ContactDetailsModel>(`${this.ticketBaseUrl}/requestContactDetailsFromSuggestedListId`,
      { "suggestedTicketId": suggestedTicketId }
    );
  }
}
