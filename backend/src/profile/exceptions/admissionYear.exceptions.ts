export class AdmissionYearNotFoundException extends Error {
  constructor(id: number) {
    const message = `AdmissionYear where id = ${id} is not exist`;
    super(message);
    this.name = 'AdmissionYearNotFoundException';
  }
}
