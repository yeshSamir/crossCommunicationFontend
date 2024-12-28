import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CreateTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketType: string = 'Send'; // Or 'Receive' based on your logic

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      productName: ['', Validators.required],
      productSize: ['', Validators.required],
      productWeight: ['', [Validators.required, Validators.min(0)]],
      pickupLocation: ['', Validators.required],
      deliveryLocation: ['', Validators.required],
    });
  }

  submitTicket(): void {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;
      // Call your service to submit the ticket data here
      console.log('Ticket Submitted:', ticketData);
      this.closeDialog();
    } else {
      console.log('Form is invalid');
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
