export class StudyDirectionNotFoundException extends Error {
  constructor(id: number) {
    const message = `StudyDirection where id = ${id} is not exist`;
    super(message);
    this.name = 'StudyDirectionNotFoundException';
  }
}
