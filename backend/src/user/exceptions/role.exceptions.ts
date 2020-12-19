export class RoleNotFoundException extends Error {
    constructor(id: number) {
        const message = `Role where id = ${id} is not exist`;
        super(message);
        this.name = 'RoleNotFoundException' 
    }
}