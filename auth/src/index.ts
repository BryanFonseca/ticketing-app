import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const init = async () => {
    try {
        // connect using the K8s service
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Successfully connected to MongoDB');

        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    } catch (error) {
        console.error(error);
    }
}

init();