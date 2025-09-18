import type { NextFunction, Response, Request } from 'express';

import UnauthorizedException from '../Exceptions/UnauthorizedException.js';

import * as UserService from '../Business/User/UserService.js';

export function requiredRoles(roles: string[])
{
    return async (request: Request, _response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new UnauthorizedException();
        }

        const user = await UserService.me(request.user);

        if (!roles.every(role => user.roles.map(role => role.name).includes(role))) {
            throw new UnauthorizedException();
        }

        return next();
    };
}
