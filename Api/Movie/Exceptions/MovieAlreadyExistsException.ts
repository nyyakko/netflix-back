import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class MovieAlreadyExistsException implements HttpException
{
    status?: number = 409;
    code: string = 'MOVIE_ALREADY_EXISTS';
}
