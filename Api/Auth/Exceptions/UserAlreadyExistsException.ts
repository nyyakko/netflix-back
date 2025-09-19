import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class UserAlreadyExistsException implements HttpException
{
    status?: number = 409;
    code: string = 'USER_ALREADY_EXISTS';
}
