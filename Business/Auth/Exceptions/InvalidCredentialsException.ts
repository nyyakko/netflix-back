import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class InvalidCredentialsException implements HttpException
{
    code: string = 'INVALID_CREDENTIALS';
}
