export class LoginDetails {
  phoneNumber!: string;
  password!: string;

  constructor(init?: Partial<LoginDetails>) {
    Object.assign(this, init);
  }
}
