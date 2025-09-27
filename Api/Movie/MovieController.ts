import type { Request, Response } from 'express';

import UnauthorizedException from '../../Exceptions/UnauthorizedException.js';

import * as MovieService from './MovieService.js';

export async function save(request: Request, response: Response)
{
    response.send(await MovieService.save(request.body));
}

export async function deleteById(request: Request, response: Response)
{
    const id = parseInt(request.query.id as string);
    response.send(await MovieService.removeById(id));
}

export async function get(request: Request, response: Response)
{
    const page  = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    if ((request.query.page || request.query.limit) && !request.user) {
        throw new UnauthorizedException();
    }

    response.send(await MovieService.get(page, limit));
}

export async function getById(request: Request, response: Response)
{
    response.send(await MovieService.getById(parseInt(request.params.id!)));
}
