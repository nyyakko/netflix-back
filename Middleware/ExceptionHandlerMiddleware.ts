import type { NextFunction, Response, Request } from 'express';

import type HttpException from '../Exceptions/Core/HttpException.js';

export function the()
{
    return (error: HttpException, _request: Request, response: Response, next: NextFunction) => {
        if (error) {
            console.log(error);
            return response.status(error.status || 500).json({ error: error.code });
        }
        return next();
    };
}
