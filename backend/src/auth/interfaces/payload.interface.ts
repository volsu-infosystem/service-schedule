export interface PayloadInterface {
  readonly user: number;
  readonly profile: payloadProfileInterface;
  readonly iat: number;
  readonly exp: number;
}

export interface payloadProfileInterface {
  readonly id: number;
  readonly initials: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName: string;
  readonly email: string;
  readonly studentTicketNumber: number;
}
