import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as Cookies from 'cookie-parser';

import * as Postgres from './Persistence/Postgres.js'

import * as AuthorizationVerifierMiddleware from './Middleware/AuthorizationVerifierMiddleware.js';
import * as ExceptionHandlerMiddleware from './Middleware/ExceptionHandlerMiddleware.js';
import * as RouteProtectorMiddleware from './Middleware/RouteProtectorMiddleware.js';

import * as UserController from './Api/User/UserController.js';
import * as AuthController from './Api/Auth/AuthController.js';
import * as MovieController from './Api/Movie/MovieController.js';

Postgres.connect();

const router = express();

router.use(cors({ origin: [process.env.FRONTEND_ORIGIN!] }))
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(Cookies.default())

router.use(AuthorizationVerifierMiddleware.the());

router.post('/api/login', AuthController.login);
router.post('/api/logout', RouteProtectorMiddleware.requiredRoles(['USER']), AuthController.logout);
router.post('/api/register', AuthController.register);

router.get('/api/me', RouteProtectorMiddleware.requiredRoles(['USER']), UserController.me);

router.post('/api/movies', RouteProtectorMiddleware.requiredRoles(['ADMIN']), MovieController.save);
router.delete('/api/movies/:id', RouteProtectorMiddleware.requiredRoles(['ADMIN']), MovieController.deleteById);
router.get('/api/movies', RouteProtectorMiddleware.requiredRoles(['USER']), MovieController.get);
router.get('/api/movies/:id', RouteProtectorMiddleware.requiredRoles(['USER']), MovieController.getById);

router.use(ExceptionHandlerMiddleware.the());

router.listen(parseInt(process.env.PORT!), () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
