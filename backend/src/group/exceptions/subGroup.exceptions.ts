export class SubGroupNotFoundException extends Error {
    constructor(id: number) {
        const message = `SubGroup where id = ${id} is not exist`;
        super(message);
        this.name = 'SubGroupNotFoundException' 
    }
}