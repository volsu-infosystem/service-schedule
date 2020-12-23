export class GroupNotFoundException extends Error {
  constructor(id: number) {
    const message = `Group where id = ${id} is not exist`;
    super(message);
    this.name = 'GroupNotFoundException';
  }
}
