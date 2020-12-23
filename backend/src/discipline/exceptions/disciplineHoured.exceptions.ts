export class DisciplineHouredNotFoundException extends Error {
  constructor(id: number) {
    const message = `DisciplineHoured where id = ${id} is not exist`;
    super(message);
    this.name = 'DisciplineHouredNotFoundException';
  }
}
