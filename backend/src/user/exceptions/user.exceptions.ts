export class UserNotFoundException extends Error {
  constructor(id: number) {
    const message = `User where id = ${id} is not exist`;
    super(message);
    this.name = 'UserNotFoundException';
  }
}
