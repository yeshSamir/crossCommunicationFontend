export interface TicketResponse {
  responseCode: number;
  responseMessage: string;
  status: boolean;
  ticketModelList: TicketModel[];
}

export interface TicketModel {
  id?: number;
  ticketType: string;
  productName: string;
  productSize?: string;
  productWeight?: number;
  pickupLocation: LocationModel;
  deliveryLocation: LocationModel;
  notes?: string;
  securityPin: string;
}

export interface LocationModel {
  // Adding common location fields - adjust based on your actual LocationModel
  city: string;
  state: string;
  country: string;
  // Add any other location fields you have in your Java LocationModel
}
