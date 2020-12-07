export class ProfileNotFoundException extends Error {
    constructor(id: number) {
        const message = `Profile where id = ${id} is not exist`;
        super(message);
        this.name = 'ProfileNotFoundException' 
    }
}

export class ProfileInvalidDtoException extends Error {
    constructor() {
        const message = `CreateProfileDto is invalid`;
        super(message);
        this.name = 'ProfileInvalidDtoException' 
    }
}