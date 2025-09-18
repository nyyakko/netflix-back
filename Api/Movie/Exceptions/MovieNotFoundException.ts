import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class MovieNotFoundException implements HttpException
{
    status: number = 404;
    code: string = 'MOVIE_NOT_FOUND';
}
