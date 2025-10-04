import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class GenreAlreadyExistsException implements HttpException
{
    status?: number = 409;
    code: string = 'GENRE_ALREADY_EXISTS';
}
