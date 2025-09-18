import type { Request, Response } from 'express';

import type UserResponse from '../Contracts/Auth/Responses/UserResponse.js';

import * as UserService from '../Business/User/UserService.js';

export async function me(request: Request, response: Response<UserResponse>)
{
    response.send(await UserService.me(request.user!));
}
