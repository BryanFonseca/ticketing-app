// Programming to an interface yo
// The only reason I'm using an abstract class instead of an interface
// is that the former supports the instanceof JS operator.
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(logMessage: string) {
        // Passing in a message to the Error class for logging purposes only
        super(logMessage);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // Possibly create a separate type for what's returned from this method
    abstract serializeError(): {
        message: string;
        field?: string;
    }[];
}