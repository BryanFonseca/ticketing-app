import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: 'Not authorized',
            }
        ]
    }
}