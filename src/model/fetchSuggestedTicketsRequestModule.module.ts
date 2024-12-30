export class FetchTicketsRequestModule {
  id!: number | undefined; // Positive number
  pickupRadius!: number | undefined; // Positive number
  deliveryRadius!: number | undefined; // Positive number

  constructor(init?: Partial<FetchTicketsRequestModule>) {
    Object.assign(this, init);
  }
}
