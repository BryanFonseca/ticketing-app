import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from "../errors/custom-error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('Something went wrong', err); // log into some file might be useful

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeError() });
    }

    res.status(400).send({
        message: err.message
    });
}