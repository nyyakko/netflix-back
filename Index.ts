import express from 'express';
import bodyParser from 'body-parser';

import * as Cookies from 'cookie-parser';

import * as AuthController from './Controllers/AuthController.js';
import * as AuthorizationVerifierMiddleware from './Middleware/AuthorizationVerifierMiddleware.js';
import * as Database from './Infrastructure/Database.js'
import * as ExceptionHandlerMiddleware from './Middleware/ExceptionHandlerMiddleware.js';
import * as MovieController from './Controllers/MovieController.js';
import * as RouteProtectorMiddleware from './Middleware/RouteProtectorMiddleware.js';
import * as UserController from './Controllers/UserController.js';

Database.the();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Cookies.default())

app.use(AuthorizationVerifierMiddleware.the());

app.post('/api/login', AuthController.login);
app.post('/api/logout', RouteProtectorMiddleware.requiredRoles(['USER']), AuthController.logout);
app.post('/api/register', AuthController.register);

app.get('/api/me', RouteProtectorMiddleware.requiredRoles(['USER']), UserController.me);

app.post('/api/movies', RouteProtectorMiddleware.requiredRoles(['ADMIN']), MovieController.save);
app.delete('/api/movies/:id', RouteProtectorMiddleware.requiredRoles(['ADMIN']), MovieController.deleteById);
app.get('/api/movies', RouteProtectorMiddleware.requiredRoles(['USER']), MovieController.get);
app.get('/api/movies/:id', RouteProtectorMiddleware.requiredRoles(['USER']), MovieController.getById);

app.use(ExceptionHandlerMiddleware.the());

app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
