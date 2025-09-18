import type HttpException from './Core/HttpException.js';

export default class UnauthorizedException implements HttpException
{
    status?: number = 401;
    code: string = 'UNAUTHORIZED';
}
