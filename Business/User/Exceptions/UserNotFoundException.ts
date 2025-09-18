import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class UserNotFoundException implements HttpException
{
    code: string = 'USER_NOT_FOUND';
}
