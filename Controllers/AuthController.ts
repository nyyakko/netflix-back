import type { Request, Response } from 'express';

import * as AuthService from '../Business/Auth/AuthService.js';

export async function login(request: Request, response: Response)
{
    response.cookie('authorization', await AuthService.login(request.body), { maxAge: 900000, httpOnly: true });
    response.send();
}

export async function register(request: Request, response: Response)
{
    response.send(await AuthService.register(request.body));
}
