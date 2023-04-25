import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/User';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ], 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

        const {email, password} = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new BadRequestError(`User with email ${existingUser.email} already exists`);

        const userCreated = await User.create({
            email,
            password
        });

        const userJwt = jwt.sign({
            id: userCreated.id,
            email: userCreated.email
        }, 'some-secret-key');

        req.session = {
            jwt: userJwt
        };

        res.send(userCreated);
});

export {router as signupRouter};