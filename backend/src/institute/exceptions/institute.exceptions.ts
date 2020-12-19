export class InstituteNotFoundException extends Error {
    constructor(id: number) {
        const message = `Institute where id = ${id} is not exist`;
        super(message);
        this.name = 'InstituteNotFoundException' 
    }
}