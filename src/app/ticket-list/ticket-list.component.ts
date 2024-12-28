// src/app/components/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { TicketModel, TicketResponse} from "../../model/ticket.model";
import {TicketService} from "../ticket-service.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class TicketListComponent implements OnInit {
  loading: boolean = false;
  tickets: TicketModel[] = [];

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  // Fetch the list of tickets
  fetchTickets(): void {
    this.loading = true; // Optional: add loading state
    this.ticketService.getTickets().subscribe({
      next: (response: TicketResponse) => {
        if (response.status) {
          this.tickets = response.ticketModelList;
        } else {
          console.error('Error in response:', response.responseMessage);
        }
      },
      error: (error) => {
        console.error('Error fetching tickets:', error);
      },
      complete: () => {
        this.loading = false; // Optional: remove loading state
      }
    });
  }

  // View ticket details
  viewTicketDetails(ticketId: string): void {
    this.loading = true;
    this.ticketService.getTicketDetails(ticketId).subscribe({
      next: (response: TicketResponse) => {
        if (response.status && response.ticketModelList.length > 0) {
          const ticket = response.ticketModelList[0];
          console.log('Ticket Details:', ticket);
          // If you want to open a dialog:
          // this.dialog.open(TicketDetailsDialogComponent, { data: ticket });
        } else {
          console.error('Ticket not found or error:', response.responseMessage);
        }
      },
      error: (error) => {
        console.error('Error fetching ticket details:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
