import type { NextFunction, Response, Request } from 'express';

import InvalidTokenException from '../Exceptions/InvalidTokenException.js';

import jwt from 'jsonwebtoken';

export function the()
{
    return (request: Request, _response: Response, next: NextFunction) => {
        if (!request.cookies) return next();

        const token = request.cookies['authorization'];

        if (!token) return next();

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { name: string; email: string; };
            request.user = decoded;
        }
        catch (error) {
            throw new InvalidTokenException();
        }

        return next();
    };
}
