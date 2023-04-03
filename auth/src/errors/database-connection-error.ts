import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Database connection error.');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: 'DB connection error',
            }
        ]
    }
}