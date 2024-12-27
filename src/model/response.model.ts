export class ResponseModel {
  responseCode!: number;
  responseMessage!: string;
  status!: boolean;

  constructor(init?: Partial<ResponseModel>) {
    Object.assign(this, init);
  }
}
