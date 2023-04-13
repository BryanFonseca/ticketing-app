import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode: number = 400;
    errorDescription: string;

    constructor(description: string) {
        super('Bad request error');
        this.errorDescription = description;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.errorDescription
            }
        ];
    }
}