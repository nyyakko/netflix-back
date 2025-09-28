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

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(Cookies.default());
router.use(cors({ credentials: true, origin: [process.env.CORS_ORIGIN!] }));

router.use(AuthorizationVerifierMiddleware.the());

router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/logout', RouteProtectorMiddleware.requiredRoles(['USER']), AuthController.logout);
router.post('/api/auth/signup', AuthController.signup);

router.get('/api/users/me', RouteProtectorMiddleware.requiredRoles(['USER']), UserController.me);

router.post('/api/movies', RouteProtectorMiddleware.requiredRoles(['ADMIN']), MovieController.save);
router.delete('/api/movies/:id', RouteProtectorMiddleware.requiredRoles(['ADMIN']), MovieController.deleteById);
router.get('/api/movies', MovieController.get);
router.get('/api/movies/:id', MovieController.getById);

router.use(ExceptionHandlerMiddleware.the());

router.listen(parseInt(process.env.PORT!), () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
