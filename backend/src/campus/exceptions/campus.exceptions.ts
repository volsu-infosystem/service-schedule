export class CampusNotFoundException extends Error {
    constructor(id: number) {
        const message = `Campus where id = ${id} is not exist`;
        super(message);
        this.name = 'CampusNotFoundException' 
    }
}