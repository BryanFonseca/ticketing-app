import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super('Not found error');

        // Absolutely critical
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: 'Route not found'
            }
        ];
    }
}