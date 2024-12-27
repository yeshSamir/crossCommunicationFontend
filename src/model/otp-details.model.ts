export class OtpDetails {
  phoneNumber!: string;
  otp!: string;

  constructor(init?: Partial<OtpDetails>) {
    Object.assign(this, init);
  }
}
