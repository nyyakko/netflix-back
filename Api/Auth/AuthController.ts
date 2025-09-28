import type { Request, Response } from 'express';

import * as AuthService from './AuthService.js';

export async function login(request: Request, response: Response)
{
    response.cookie('authorization', await AuthService.login(request.body), { maxAge: 900000, httpOnly: true, sameSite: true  });
    response.send();
}

export async function logout(request: Request, response: Response)
{
    response.clearCookie('authorization');
    response.send();
}

export async function signup(request: Request, response: Response)
{
    response.send(await AuthService.signup(request.body));
}
