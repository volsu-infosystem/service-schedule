export class ProfileNotFoundException extends Error {
  constructor(id: number) {
    const message = `Profile where id = ${id} is not exist`;
    super(message);
    this.name = 'ProfileNotFoundException';
  }
}

export class ProfileByEmailNotFoundException extends Error {
  constructor(email: string) {
    const message = `Profile where email = ${email} is not exist`;
    super(message);
    this.name = 'ProfileByEmailNotFoundException';
  }
}
