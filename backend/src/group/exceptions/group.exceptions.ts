export class GroupNotFoundException extends Error {
  constructor(id: number) {
    const message = `Group where id = ${id} is not exist`;
    super(message);
    this.name = 'GroupNotFoundException';
  }
}

export class GroupByNameNotExistException extends Error {
  constructor(name: string) {
    const message = `Group where name is ${name} is not exist`;
    super(message);
    this.name = 'GroupByNameNotExistException';
  }
}
