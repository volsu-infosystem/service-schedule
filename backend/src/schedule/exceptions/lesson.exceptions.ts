export class LessonNotFoundException extends Error {
  constructor(id: number) {
    const message = `Lesson where id = ${id} is not exist`;
    super(message);
    this.name = 'LessonNotFoundException';
  }
}
