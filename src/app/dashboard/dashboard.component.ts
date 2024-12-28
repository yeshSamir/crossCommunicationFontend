import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import {TicketService} from "../ticket-service.service";
import {TicketDialogComponent} from "../ticket-dialog/ticket-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  tickets: any[] = [];

  constructor(private ticketService: TicketService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    // Fetch tickets from the backend
    this.ticketService.getTickets().subscribe((data: any[]) => {
      this.tickets = data;
    });
  }

  openCreateTicketDialog(ticketType: string) {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '400px',
      data: { ticketType },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTickets(); // Reload tickets after creating a new one
      }
    });
  }

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
