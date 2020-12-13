export class ProfileNotFoundException extends Error {
    constructor(id: number) {
        const message = `Profile where id = ${id} is not exist`;
        super(message);
        this.name = 'ProfileNotFoundException' 
    }
}

export class ProfileByEmailNotFoundException extends Error {
    constructor(email: string) {
        const message = `Profile where email = ${email} is not exist`;
        super(message);
        this.name = 'ProfileByEmailNotFoundException' 
    }
}


export class ProfileInvalidDtoException extends Error {
    constructor() {
        const message = `CreateProfileDto is invalid`;
        super(message);
        this.name = 'ProfileInvalidDtoException' 
    }
}

export class ProfileInvalidTypeException extends Error {
    constructor() {
        const message = `Profile Type is invalid`;
        super(message);
        this.name = 'ProfileInvalidTypeException' 
    }
}