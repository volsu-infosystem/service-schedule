export class CathedraNotFoundException extends Error {
  constructor(id: number) {
    const message = `Cathedra where id = ${id} is not exist`;
    super(message);
    this.name = 'CathedraNotFoundException';
  }
}
