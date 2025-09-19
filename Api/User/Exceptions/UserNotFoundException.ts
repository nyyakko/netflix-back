import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class UserNotFoundException implements HttpException
{
    status?: number = 404;
    code: string = 'USER_NOT_FOUND';
}
