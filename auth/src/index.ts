import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import sequelize from './sequelize';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { User } from './models/User';

const app = express();
app.set('trust proxy', true) // to allow ingress-nginx traffic
app.use(json());
app.use(
    cookieSession({
        signed: false, // disables encryption
        secure: true
    })
);

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
        // Tests the connection 
        (await sequelize).authenticate();

        console.log('Successfully connected to MySQL Database');

        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    } catch (error) {
        console.error(error);
    }
}

init();