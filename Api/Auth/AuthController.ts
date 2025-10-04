import type { Request, Response } from 'express';

import * as AuthService from './AuthService.js';

export async function signIn(request: Request, response: Response)
{
    response.cookie('authorization', await AuthService.signIn(request.body), { maxAge: 900000, httpOnly: true, sameSite: true  });
    response.send();
}

export async function signOff(request: Request, response: Response)
{
    response.clearCookie('authorization');
    response.send();
}

export async function signUp(request: Request, response: Response)
{
    response.send(await AuthService.signUp(request.body));
}
