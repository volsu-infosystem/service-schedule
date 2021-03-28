export class EmailIsNotVolsuException extends Error {
    constructor(email: string) {
      const message = `Email ${email} is not @volsu.ru email`;
      super(message);
      this.name = 'EmailIsNotVolsuException';
    }
  }
  