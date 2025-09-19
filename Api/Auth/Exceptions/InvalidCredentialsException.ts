import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class InvalidCredentialsException implements HttpException
{
    status?: number = 401;
    code: string = 'INVALID_CREDENTIALS';
}
