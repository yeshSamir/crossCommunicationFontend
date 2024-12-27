export class LoginResponseModel {
  responseCode!: number;
  responseMessage!: string;
  status!: boolean;
  token!: boolean;

  constructor(init?: Partial<LoginResponseModel>) {
    Object.assign(this, init);
  }
}
