import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { Sequelize } from 'sequelize-typescript';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { User } from './models/User';

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
        const sequelize = new Sequelize('auth-db', 'user', 'pass', {
            host: 'auth-mysql-srv',
            dialect: 'mysql',
            models: [__dirname + '/models']
        });

        await sequelize.sync({ force: true }); // Crea las tablas necesarias

        // This tests the connection 
        await sequelize.authenticate();
        console.log('Successfully connected to MySQL Database');

        await User.create({
            email: 'isaac1805@hotmail.com',
            password: 'test',
        });

        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    } catch (error) {
        console.error(error);
    }
}

init();