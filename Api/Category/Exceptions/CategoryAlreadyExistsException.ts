import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class CategoryAlreadyExistsException implements HttpException
{
    status?: number = 409;
    code: string = 'CATEGORY_ALREADY_EXISTS';
}
