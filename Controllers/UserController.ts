import type { Request, Response } from 'express';

import * as UserService from '../Business/User/UserService.js';

export async function me(request: Request, response: Response)
{
    response.send(await UserService.me(request.user!));
}
