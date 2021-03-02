export class ScheduleNotFoundException extends Error {
  constructor(id: number) {
    const message = `Schedule where id = ${id} is not exist`;
    super(message);
    this.name = 'ScheduleNotFoundException';
  }
}
