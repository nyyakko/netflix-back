import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class MovieAlreadyExistsException implements HttpException
{
    code: string = 'MOVIE_ALREADY_EXISTS';
}
