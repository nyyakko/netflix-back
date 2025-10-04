import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class GenreNotFoundException implements HttpException
{
    status: number = 404;
    code: string = 'GENRE_NOT_FOUND';
}
