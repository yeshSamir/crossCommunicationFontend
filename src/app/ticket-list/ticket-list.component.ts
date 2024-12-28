// src/app/components/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import {Ticket} from "../../model/ticket.model";
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
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  // Fetch the list of tickets
  fetchTickets(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  // View ticket details
  viewTicketDetails(ticketId: string): void {
    this.ticketService.getTicketDetails(ticketId).subscribe(
      (ticket) => {
        // Open a dialog or navigate to a detailed view
        console.log('Ticket Details:', ticket);
        // Optionally, open a dialog to show ticket details
        // this.dialog.open(TicketDetailsDialogComponent, { data: ticket });
      },
      (error) => {
        console.error('Error fetching ticket details', error);
      }
    );
  }
}
