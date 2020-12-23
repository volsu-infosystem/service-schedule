export class RoomNotFoundException extends Error {
  constructor(id: number) {
    const message = `Room where id = ${id} is not exist`;
    super(message);
    this.name = 'RoomNotFoundException';
  }
}
