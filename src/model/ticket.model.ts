// src/app/models/ticket.model.ts
export interface Ticket {
  id: string;
  productName: string;
  ticketType: string;
  productWeight: number;
  pickupLocation: string;
  deliveryLocation: string;
  notes: string;
}
