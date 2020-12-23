export class EquipmentNotFoundException extends Error {
  constructor(id: number) {
    const message = `Equipment where id = ${id} is not exist`;
    super(message);
    this.name = 'EquipmentNotFoundException';
  }
}
