export class DisciplineNotFoundException extends Error {
    constructor(id: number) {
        const message = `Discipline where id = ${id} is not exist`;
        super(message);
        this.name = 'DisciplineNotFoundException' 
    }
}