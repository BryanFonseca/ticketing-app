import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 403;
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super('Validation Error');

        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return this.errors.map(error => ({
            message: error.msg,
            field: error.param
        }));
    }
}