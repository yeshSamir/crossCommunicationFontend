import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import {TicketService} from "../ticket-service.service";
import {TicketDialogComponent} from "../ticket-dialog/ticket-dialog.component";
import {TicketModel, TicketResponse} from "../../model/ticket.model";

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
  ticketsLists: TicketModel[] = []; // or tickets: TicketResponse | null = null;

  constructor(private ticketService: TicketService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (res) => {
        console.log("Response back from Backend");
        if(res.status) {
          console.log("List getting tickets");
          this.ticketsLists = res.ticketModelList;
          console.log(this.ticketsLists);
        }
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to Fetch tickets. Please try again.');
      },
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

  viewTicketDetails(ticketId: number | undefined): void {
    this.ticketService.getTicketDetails(String(ticketId)).subscribe(
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
