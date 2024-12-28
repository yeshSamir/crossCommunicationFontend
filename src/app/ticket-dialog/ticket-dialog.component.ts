import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TicketService} from "../ticket-service.service";


@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css'],
})
export class TicketDialogComponent {
  ticketForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ticketService: TicketService
  ) {
    this.ticketForm = this.fb.group({
      productName: ['', Validators.required],
      productSize: ['', Validators.required],
      productWeight: ['', Validators.required],
      securityPin: ['', Validators.required],
      pickupLocation: this.fb.group({
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
      }),
      deliveryLocation: this.fb.group({
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
      }),
      notes: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitTicket(): void {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;
      ticketData.ticketType = this.data.ticketType; // Set the ticket type (SEND/RECEIVE)
      this.ticketService.createTicket(ticketData).subscribe((response) => {
        this.dialogRef.close(true);
      });
    }
  }
}
