export class ContactDetailsModel {
  responseCode!: number;
  responseMessage!: string;
  status!: boolean;
  name!: string;
  phoneNumber!: string;

  constructor(init?: Partial<ContactDetailsModel>) {
  Object.assign(this, init);
}

}

