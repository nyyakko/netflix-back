import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class UserAlreadyExistsException implements HttpException
{
    code: string = 'USER_ALREADY_EXISTS';
}
