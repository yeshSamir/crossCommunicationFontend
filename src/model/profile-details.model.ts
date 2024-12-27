export class ProfileDetails {
  firstName!: string;
  lastName!: string;
  gender!: string;
  countryName!: string;
  personalAddress!: string;
  phoneNumber!: string;
  email!: string;
  password!: string;
  securityQuestion?: string;
  securityAnswer?: string;
  securityPin!: string;
  confirmSecurityPin!: string;

  constructor(init?: Partial<ProfileDetails>) {
    Object.assign(this, init);
  }

  /**
   * Validates if security pin and confirm security pin match.
   * @returns boolean
   */
  isSecurityPinConfirmed(): boolean {
    return this.securityPin === this.confirmSecurityPin;
  }
}
