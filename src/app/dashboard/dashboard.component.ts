import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {trigger, transition, style, animate} from '@angular/animations';
import {TicketService} from "../ticket-service.service";
import {TicketDialogComponent} from "../ticket-dialog/ticket-dialog.component";
import {TicketModel, TicketResponse} from "../../model/ticket.model";
import {FetchTicketsRequestModule} from "../../model/fetchSuggestedTicketsRequestModule.module";
import {ContactDetailsModel} from "../../model/contactDetails.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({opacity: 0})),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  fetchSuggestedTickets: FetchTicketsRequestModule = new FetchTicketsRequestModule();
  ticketsLists: TicketModel[] = []; // or tickets: TicketResponse | null = null;
  suggestedTicketsLists: TicketModel[] = [];
  // or tickets: TicketResponse | null = null;
  contactDetailsModel: ContactDetailsModel = new ContactDetailsModel();

  isCheck: boolean = true; // Controls which list to display
  isPopupOpen = false; // Controls popup visibility
  pickupRadius: number = 0; // User input for pickup radius
  deliveryRadius: number = 0; // User input for delivery radius
  selectedTicketId: number | undefined; // Store selected ticket ID

  constructor(private ticketService: TicketService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (res) => {
        console.log("Response back from Backend");
        if (res.status) {
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
      data: {ticketType: ticketType}, // Pass 'Send' or 'Receive'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Create ticket");
        this.loadTickets();
      }
    });
  }

  openPopup(ticketId: number | undefined) {
    this.selectedTicketId = ticketId;
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.pickupRadius = 0;
    this.deliveryRadius = 0;
  }

  sendRadius() {
    if (this.selectedTicketId) {
      this.fetchSuggestedTickets.id = this.selectedTicketId;
      this.fetchSuggestedTickets.pickupRadius = (this.pickupRadius * 1609.34);
      this.fetchSuggestedTickets.deliveryRadius = (this.deliveryRadius * 1609.34);

      this.ticketService.getTicketDetails(this.fetchSuggestedTickets).subscribe({
        next: (res) => {
          console.log("Response back from Backend");
          if (res.status) {
            this.isCheck = false;
            console.log("List getting Suggested tickets");
            this.suggestedTicketsLists = res.ticketModelList;
            console.log(this.suggestedTicketsLists);
          }
          this.isCheck = false;
        },
        error: (err) => {
          console.error('Error Fetching Suggested Lists:', err);
          alert('Failed to Fetch Suggested Lists. Please try again.');
        },
      });

      console.log('Radius Sent:', {
        ticketId: this.selectedTicketId,
        pickupRadius: this.pickupRadius,
        deliveryRadius: this.deliveryRadius,
      });
    }
    this.closePopup();
  }

  goBackToTicketList(): void {
    this.isCheck = true; // Switch back to the ticket list
    console.log('Back to Ticket List');
  }

  startChat(ticketId: number | undefined): void {
    console.log(`Starting chat for ticket ID: ${ticketId}`);
    console.log('Sample message: "Hello! How can we assist you with this ticket?"');
  }

  requestContactInformation(ticketId: number | undefined): void {
    console.log(`Starting Requesting Contact Details for ticket ID: ${ticketId}`);
    console.log('Name: Samir Nepal, mobile:5096015874"');
      this.ticketService.requestContactDetailsFromSuggestedListId(ticketId).subscribe({
        next: (res) => {
          if (res.status) {
           this.contactDetailsModel = res
            console.log(this.contactDetailsModel)
            alert(res.responseMessage)
          }
        },
        error: (err) => {
          console.error('Error Requesting Contact:', err);
          alert('Failed to Requesting Contact. Please try again.');
        },
      });

  }
}
